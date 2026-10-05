import { NextRequest, NextResponse } from "next/server";

import Booking from "@/models/booking";
import BookingSlot from "@/models/bookingslot";
import connectDB from "@/libs/mongo";
import { sendBookingEmail } from "@/libs/mail";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, phone, service, date, requestedTime } = body;
    console.log("Received booking request:", body);

    if (!name || !email || !phone || !service || !date || !requestedTime) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    const normalizedDate = date.replace(/\//g, "-");

    const dateParts = normalizedDate.split("-");

    if (dateParts.length !== 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid date format",
        },
        { status: 400 },
      );
    }

    const year = dateParts[0];
    const month = dateParts[1].padStart(2, "0");
    const day = dateParts[2].padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    if (!/^\d{2}:\d{2}$/.test(requestedTime)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid time format",
        },
        { status: 400 },
      );
    }

    const occupiedFrom = new Date(`${formattedDate}T${requestedTime}:00`);

    if (isNaN(occupiedFrom.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid date or time",
        },
        { status: 400 },
      );
    }

    const serviceStartAt = new Date(occupiedFrom.getTime() + 30 * 60 * 1000);

    const serviceEndAt = new Date(serviceStartAt.getTime() + 60 * 60 * 1000);

    const existingSlot = await BookingSlot.findOne({
      date: formattedDate,
      status: "confirmed",

      occupiedFrom: {
        $lt: serviceEndAt,
      },

      serviceEndAt: {
        $gt: occupiedFrom,
      },
    });

    if (existingSlot) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This time slot is already taken. Please choose another time slot.",
        },
        { status: 409 },
      );
    }

    const bookingSlot = await BookingSlot.create({
      date: formattedDate,
      requestedTime,
      occupiedFrom,
      serviceStartAt,
      serviceEndAt,
      status: "confirmed",
    });

    const booking = await Booking.create({
      name,
      email,
      phone,
      service,

      date: formattedDate,

      requestedTime,

      slot: bookingSlot._id,

      status: "confirmed",
    });

    await sendBookingEmail({
      name,
      email,
      phone,
      service,
      date: formattedDate,
      requestedTime,
      serviceStartAt,
      serviceEndAt,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking confirmed successfully",
        booking,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Booking error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create booking",
      },
      { status: 500 },
    );
  }
}
