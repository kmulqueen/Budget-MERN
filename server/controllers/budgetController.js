const Budget = require("../models").Budget;

module.exports = {
  createBudget: async function (req, res) {
    const { monthlyIncome, monthlyExpenses } = req.body;

    // Check for empty income & expense arrays
    if (
      (monthlyIncome && monthlyIncome.length === 0) ||
      (monthlyExpenses && monthlyExpenses.length === 0)
    ) {
      res.status(400).json({
        message: "At least one income and one expense item is required.",
      });
    } else {
      // Check if the user has already created a budget
      const alreadyCreated = await Budget.find({ user: req.user._id });

      if (alreadyCreated) {
        res.status(400).json({ message: "User has already created a budget." });
      } else {
        // Calculate total income & total expenses
        const totalMonthlyIncome = monthlyIncome.reduce(
          (acc, item) => acc + item.amount,
          0
        );
        const totalMonthlyExpenses = monthlyExpenses.reduce(
          (acc, item) => acc + item.amount,
          0
        );

        // Calculate discretionary fund
        const discretionaryFund = totalMonthlyIncome - totalMonthlyExpenses;

        // Calculate emergency fund
        const emergencyFund = totalMonthlyExpenses * 6;

        // Create budget
        const budget = new Budget({
          user: req.user._id,
          monthlyIncome,
          monthlyExpenses,
          discretionaryFund,
          emergencyFund,
        });

        const createdBudget = await budget.save();

        // Return 201 status & created budget
        res.status(201).json(createdBudget);
      }
    }
  },
  getUserBudget: async function (req, res) {
    const budget = await Budget.findOne({ user: req.user._id });

    if (!budget) {
      res.status(404).json({ message: "Budget not found for this user." });
    } else {
      res.status(200).json(budget);
    }
  },
};
