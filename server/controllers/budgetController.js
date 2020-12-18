const Budget = require("../models").Budget;

module.exports = {
  createCategory: async function (req, res) {
    // Get categories from req.body
    const { categories } = req.body;

    // Try to find user's budget
    const userBudget = await Budget.findOne({ user: req.user._id });

    // Check if user's budget was found
    if (!userBudget) {
      res.status(404).json({ message: "Budget not found." });
    } else {
      // Check if there are new categories to be added
      if (categories.length >= 1) {
        // Check if category already exists
        let categoriesNames = categories.map((category) => category.name);
        let alreadyExistingNames = userBudget.categories.map(
          (category) => category.name
        );
        let isFound = [];

        categoriesNames.forEach((name) => {
          for (const existingName of alreadyExistingNames) {
            if (name === existingName) {
              isFound.push(name);
            }
          }
        });

        // If category name already exists throw 400 status
        if (isFound.length >= 1) {
          res
            .status(400)
            .json({ message: "You already have a category with that name." });
        } else {
          // Add new categories
          userBudget.categories = [...userBudget.categories, ...categories];

          // Save budget
          await userBudget.save();
          res.json(userBudget);
        }
      } else {
        // Return 400 status
        res.status(400).json({ message: "Please create at least 1 category." });
      }
    }
  },
  createBudget: async function (req, res) {
    // Try to find budget with user id
    const alreadyCreated = await Budget.findOne({ user: req.user._id });

    // Check if user already has a budget created.
    if (alreadyCreated) {
      res.status(400).json({ message: "Budget already exists for this user." });
    } else {
      // Create new budget
      const newBudget = new Budget({
        user: req.user._id,
      });

      // Save budget
      await newBudget.save();
      res.json(newBudget);
    }
  },
  getUserBudget: async function (req, res) {
    // Try to find budget by user's id
    const budget = await Budget.findOne({ user: req.user._id });

    // Check for budget
    if (!budget) {
      res.status(404).json({ message: "Budget not found." });
    } else {
      res.status(200).json(budget);
    }
  },
  addBudgetItems: async function (req, res) {
    // Try to find user's budget
    const budget = await Budget.findOne({ user: req.user._id });

    // Check for budget
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
      // Calculate new discretionary fund
      const discretionaryFund = totalMonthlyIncome - totalMonthlyExpenses;
      budget.discretionaryFund = discretionaryFund;
      // Calculate new emergency fund
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
          budgetIncomeItem.category =
            req.body.category || budgetIncomeItem.category;
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
          // Calculate new discretionary fund
          const discretionaryFund = totalMonthlyIncome - totalMonthlyExpenses;
          budget.discretionaryFund = discretionaryFund;
          // Calculate new emergency fund
          const emergencyFund = totalMonthlyExpenses * 6;
          budget.emergencyFund = emergencyFund;
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
          budgetExpenseItem.category =
            req.body.category || budgetExpenseItem.category;
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
          // Calculate new discretionary fund
          const discretionaryFund = totalMonthlyIncome - totalMonthlyExpenses;
          budget.discretionaryFund = discretionaryFund;
          // Calculate new emergency fund
          const emergencyFund = totalMonthlyExpenses * 6;
          budget.emergencyFund = emergencyFund;
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
  deleteBudgetItem: async function (req, res) {
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
          // Delete budget item
          budgetIncomeItem.remove();
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
          // Calculate new discretionary fund
          const discretionaryFund = totalMonthlyIncome - totalMonthlyExpenses;
          budget.discretionaryFund = discretionaryFund;
          // Calculate new emergency fund
          const emergencyFund = totalMonthlyExpenses * 6;
          budget.emergencyFund = emergencyFund;
          // Save budget
          await budget.save();
          res.json({ message: "Item successfully deleted." });
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
          // Delete budget item
          budgetExpenseItem.remove();
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
          // Calculate new discretionary fund
          const discretionaryFund = totalMonthlyIncome - totalMonthlyExpenses;
          budget.discretionaryFund = discretionaryFund;
          // Calculate new emergency fund
          const emergencyFund = totalMonthlyExpenses * 6;
          budget.emergencyFund = emergencyFund;
          // Save budget
          await budget.save();
          res.json({ message: "Item successfully deleted." });
        }
      });
    } else if (type !== "inc" || type !== "exp") {
      // If the type isn't inc or exp throw 400 status
      res.status(400).json({ message: "Invalid URL Parameters." });
    }
  },
};
