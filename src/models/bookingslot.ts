import { Schema, models, model } from "mongoose";

const bookingSlotSchema = new Schema(
  {
    // Calendar date
    // Example: "2026-10-04"
    date: {
      type: String,
      required: true,
    },

    // Time selected by customer
    // Example: "09:00"
    requestedTime: {
      type: String,
      required: true,
    },

    // Slot becomes occupied from this time
    // Example: 09:00
    occupiedFrom: {
      type: Date,
      required: true,
    },

    // Actual service starts after 30 minutes
    // Example: 09:30
    serviceStartAt: {
      type: Date,
      required: true,
    },

    // Service finishes after 1 hour
    // Example: 10:30
    serviceEndAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

bookingSlotSchema.index({
  date: 1,
  occupiedFrom: 1,
});

export default models.BookingSlot ||
  model("BookingSlot", bookingSlotSchema);