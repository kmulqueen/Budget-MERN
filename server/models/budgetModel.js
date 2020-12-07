const mongoose = require("mongoose");

const incExpSchema = mongoose.Schema({
  description: { type: String },
  amount: { type: Number },
});

const budgetSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  monthlyIncome: [incExpSchema],
  monthlyExpenses: [incExpSchema],
  discretionaryFund: {
    type: Number,
  },
  emergencyFund: {
    type: Number,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
