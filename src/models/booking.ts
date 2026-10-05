import { Schema, models, model } from "mongoose";

const bookingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    service: {
      type: [String],
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    requestedTime: {
      type: String,
      required: true,
    },

    slot: {
      type: Schema.Types.ObjectId,
      ref: "BookingSlot",
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

export default models.Booking || model("Booking", bookingSchema);