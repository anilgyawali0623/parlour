import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/libs/mongo";
import BookingSlot from "@/models/bookingslot";

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const date = request.nextUrl.searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          message: "Date is required",
        },
        { status: 400 }
      );
    }

    const bookings = await BookingSlot.find({
      date,
      status: "confirmed",
    })
      .sort({ occupiedFrom: 1 })
      .lean();

    const unavailableSlots = bookings.map((booking) => {
      const occupiedFrom = new Date(booking.occupiedFrom);
      const serviceEndAt = new Date(booking.serviceEndAt);

      return {
        from: formatTime(occupiedFrom),
        to: formatTime(serviceEndAt),
        message: `Occupied from ${formatTime(
          occupiedFrom
        )} to ${formatTime(
          serviceEndAt
        )}. Please select a different time slot.`,
      };
    });

    return NextResponse.json({
      success: true,
      date,
      unavailableSlots,
    });
  } catch (error) {
    console.error("Unavailable slots error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error
          ? error.message : "Failed to fetch unavailable slots",
      },
      { status: 500 }
    );
  }
}