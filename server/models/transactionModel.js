const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionType: { type: String },
    description: { type: String },
    amount: { type: Number },
    category: {
      type: String,
    },
    date: { type: Date, default: Date.now().toLocaleString() },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
