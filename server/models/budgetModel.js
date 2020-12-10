const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String },
});

const incExpSchema = mongoose.Schema({
  description: { type: String },
  amount: { type: Number },
  category: categorySchema,
});

const budgetSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  monthlyIncome: [incExpSchema],
  monthlyExpenses: [incExpSchema],
  categories: [categorySchema],
  discretionaryFund: {
    type: Number,
  },
  emergencyFund: {
    type: Number,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
