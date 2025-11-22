import { Schema, model } from "mongoose";

const LoanSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: Date,
    status: {
      type: String,
      enum: ["borrowed", "returned", "overdue"],
      default: "borrowed"
    }
  },
  { timestamps: true }
);

LoanSchema.index({ user: 1, book: 1, status: 1 });

export default model("Loan", LoanSchema);

