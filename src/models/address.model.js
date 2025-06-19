import { Schema, model } from "mongoose";

const addressSchema = new Schema(
  {
    address: {
      country: { type: String },
      state: { type: String },
      city: { type: String },
      street: { type: String },
      postalCode: { type: String },
    },
  },
  { timestamps: true },
);

export const Address = model.Schema("Address", addressSchema);
