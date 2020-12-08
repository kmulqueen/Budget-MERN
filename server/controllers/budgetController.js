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
      const alreadyCreated = await Budget.findOne({ user: req.user._id });

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
  addBudgetItems: async function (req, res) {
    const budget = await Budget.findOne({ user: req.user._id });

    if (budget) {
      // Initialize income and expense items
      let newIncomeItems, newExpenseItems;

      // Check for income items from req.body
      if (req.body.incomeItems) {
        // Assign newIncomeItems to the request income items
        newIncomeItems = req.body.incomeItems;
        // Spread new items into existing monthlyIncome array
        budget.monthlyIncome = [...budget.monthlyIncome, ...newIncomeItems];
      } else {
        // Monthly income stays as it was
        budget.monthlyIncome = budget.monthlyIncome;
      }

      // Check for expense items from req.body
      if (req.body.expenseItems) {
        // Assign newExpenseItems to the request expense items
        newExpenseItems = req.body.expenseItems;
        // Spread new items into existing monthlyExpenses array
        budget.monthlyExpenses = [
          ...budget.monthlyExpenses,
          ...newExpenseItems,
        ];
      } else {
        // Monthly expenses stays as it was
        budget.monthlyExpenses = budget.monthlyExpenses;
      }

      // Calculate new total monthly income
      const totalMonthlyIncome = budget.monthlyIncome.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      // Calculate new total monthly expenses
      const totalMonthlyExpenses = budget.monthlyExpenses.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      // Calculate new discretionary fund & update discretionary fund in budget
      const discretionaryFund = totalMonthlyIncome - totalMonthlyExpenses;
      budget.discretionaryFund = discretionaryFund;
      // Calculate new emergency fund & update emergency fund in budget
      const emergencyFund = totalMonthlyExpenses * 6;
      budget.emergencyFund = emergencyFund;
      // Save updated budget
      const updatedBudget = await budget.save();

      res.json(updatedBudget);
    } else {
      res.status(404).json({ message: "Budget not found." });
    }
  },
  getBudgetItem: async function (req, res) {
    // Get the budget item type from req.params
    const type = req.params.itemtype;
    // Check for appropriate type
    if (type === "inc") {
      let budgetIncomeItem;
      // Find budget by budgetid params
      await Budget.findById(req.params.budgetid, function (err, budget) {
        // Try to find item in monthlyIncome array by itemid params
        budgetIncomeItem = budget.monthlyIncome.id(req.params.itemid);
        // Check for error
        if (err) {
          res.status(422).json(err);
        } else {
          // If budget income item is found return item
          if (budgetIncomeItem) {
            res.json(budgetIncomeItem);
          } else {
            res.status(404).json({ message: "Income item not found." });
          }
        }
      });
    } else if (type === "exp") {
      let budgetExpenseItem;
      // Find budget by budgetid params
      await Budget.findById(req.params.budgetid, function (err, budget) {
        // Try to find item in monthlyExpenses array
        budgetExpenseItem = budget.monthlyExpenses.id(req.params.itemid);
        // Check for error
        if (err) {
          res.status(422).json(err);
        } else {
          // If budget expense item found return item
          if (budgetExpenseItem) {
            res.json(budgetExpenseItem);
          } else {
            res.status(404).json({ message: "Expense item not found." });
          }
        }
      });
    } else if (type !== "inc" || type !== "exp") {
      // If the type isn't inc or exp throw 400 status
      res.status(400).json({ message: "Invalid URL Parameters." });
    }
  },
  updateBudgetItem: async function (req, res) {
    // Get the budget item type from req.params
    const type = req.params.itemtype;
    // Initialize income & expense item variables
    let budgetIncomeItem, budgetExpenseItem;
    // Check for appropriate type
    if (type === "inc") {
      // Find budget by budgetid params
      await Budget.findById(req.params.budgetid, async function (err, budget) {
        // Try to find item in monthlyIncome array by itemid params
        budgetIncomeItem = budget.monthlyIncome.id(req.params.itemid);
        // Check for error
        if (err) {
          res.status(422).json(err);
        }
        // Check for income item
        if (!budgetIncomeItem) {
          res.status(404).json({ message: "Income item not found." });
        } else {
          // Set updated fields
          budgetIncomeItem.description =
            req.body.description || budgetIncomeItem.description;
          budgetIncomeItem.amount = req.body.amount || budgetIncomeItem.amount;
          // Save budget
          await budget.save();
          res.json(budgetIncomeItem);
        }
      });
    } else if (type === "exp") {
      // Find budget by budgetid params
      await Budget.findById(req.params.budgetid, async function (err, budget) {
        // Try to find item in monthlyExpenses array
        budgetExpenseItem = budget.monthlyExpenses.id(req.params.itemid);
        // Check for error
        if (err) {
          res.status(422).json(err);
        }
        // Check for expense item
        if (!budgetExpenseItem) {
          res.status(404).json({ message: "Expense item not found." });
        } else {
          // Set updated fields
          budgetExpenseItem.description =
            req.body.description || budgetExpenseItem.description;
          budgetExpenseItem.amount =
            req.body.amount || budgetExpenseItem.amount;
          // Save budget
          await budget.save();
          res.json(budgetExpenseItem);
        }
      });
    } else if (type !== "inc" || type !== "exp") {
      // If the type isn't inc or exp throw 400 status
      res.status(400).json({ message: "Invalid URL Parameters." });
    }
  },
};
