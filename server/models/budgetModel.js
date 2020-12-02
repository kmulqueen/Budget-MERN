const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  monthlyIncome: [
    {
      description: { type: String },
      amount: { type: Number },
    },
  ],
  monthlyExpenses: [
    {
      description: { type: String },
      amount: { type: Number },
    },
  ],
  discretionaryFund: {
    type: Number,
  },
  emergencyFund: {
    type: Number,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
