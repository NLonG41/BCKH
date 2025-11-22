import { Schema, model } from "mongoose";

const BookSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, trim: true },
    category: { type: String, required: true, index: true },
    description: String,
    coverUrl: String,
    quantity: { type: Number, default: 1, min: 0 },
    borrowedCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default model("Book", BookSchema);

