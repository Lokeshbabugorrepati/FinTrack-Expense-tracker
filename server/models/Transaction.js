import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
      min: [0.01, "Amount must be greater than 0"],
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: [true, "Please specify transaction type"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Please provide a date"],
      default: Date.now,
    },
    note: {
      type: String,
      trim: true,
      maxlength: [200, "Note cannot exceed 200 characters"],
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
transactionSchema.index({ user: 1, date: -1 });
transactionSchema.index({ user: 1, type: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
