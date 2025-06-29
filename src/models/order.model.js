import mongoose from "mongoose";
import { enumPaymentStatus, availableEnumPaymentStatus, enumOrderStatus, availableOrderStatus } from "../constants.js";

const orderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: enumPaymentStatus,
      default: availableEnumPaymentStatus.PENDING
    },
    orderStatus: {
      type: String,
      enum: enumOrderStatus,
      default: availableOrderStatus.PROCESSING,
    },
    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
