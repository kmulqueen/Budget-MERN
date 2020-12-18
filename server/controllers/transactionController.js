const Transaction = require("../models/").Transaction;

module.exports = {
  createTransaction: async function (req, res) {
    try {
      const { transactionType, description, amount, category } = req.body;

      const newTransaction = new Transaction({
        user: req.user._id,
        transactionType,
        description,
        amount,
        category,
      });

      await newTransaction.save();
      res.json(newTransaction);
    } catch (error) {
      res.status(422).json(error);
    }
  },
  getUserTransactions: async function (req, res) {
    try {
      // Get filters from req.body
      const { month, year, category, transactionType } = req.body;

      let monthParsed, yearParsed, transactions;

      // Format year
      if (year) {
        yearParsed = year;
      } else {
        yearParsed = new Date().getFullYear();
      }

      // Format month
      if (month) {
        switch (month.toLowerCase()) {
          case "january":
            monthParsed = 1;
            break;
          case "february":
            monthParsed = 2;
            break;
          case "march":
            monthParsed = 3;
            break;
          case "april":
            monthParsed = 4;
            break;
          case "may":
            monthParsed = 5;
            break;
          case "june":
            monthParsed = 6;
            break;
          case "july":
            monthParsed = 7;
            break;
          case "august":
            monthParsed = 8;
            break;
          case "september":
            monthParsed = 9;
            break;
          case "october":
            monthParsed = 10;
            break;
          case "november":
            monthParsed = 11;
            break;
          case "december":
            monthParsed = 12;
            break;

          default:
            monthParsed = null;
            break;
        }
      }

      // Query DB based on req.body
      if (month && category && transactionType) {
        transactions = await Transaction.find({
          user: req.user._id,
          date: {
            $gte: `${yearParsed}-${monthParsed}-01`,
            $lte: `${yearParsed}-${monthParsed}-31`,
          },
          category: category,
          transactionType: transactionType,
        });
      } else if (!month && category && transactionType) {
        transactions = await Transaction.find({
          user: req.user._id,
          category: category,
          transactionType: transactionType,
        });
      } else if (month && !category && transactionType) {
        transactions = await Transaction.find({
          user: req.user._id,
          date: {
            $gte: `${yearParsed}-${monthParsed}-01`,
            $lte: `${yearParsed}-${monthParsed}-31`,
          },
          transactionType: transactionType,
        });
      } else if (month && category && !transactionType) {
        transactions = await Transaction.find({
          user: req.user._id,
          date: {
            $gte: `${yearParsed}-${monthParsed}-01`,
            $lte: `${yearParsed}-${monthParsed}-31`,
          },
          category: category,
        });
      } else if (month && !category && !transactionType) {
        transactions = await Transaction.find({
          user: req.user._id,
          date: {
            $gte: `${yearParsed}-${monthParsed}-01`,
            $lte: `${yearParsed}-${monthParsed}-31`,
          },
        });
      } else if (!month && category && !transactionType) {
        transactions = await Transaction.find({
          user: req.user._id,
          category: category,
        });
      } else if (!month && !category && transactionType) {
        transactions = await Transaction.find({
          user: req.user._id,
          transactionType: transactionType,
        });
      } else if (!month && !year && !category) {
        transactions = await Transaction.find({ user: req.user._id });
      }

      // Check for DB results
      if (!transactions.length) {
        res
          .status(404)
          .json({ message: "No transactions found that match the filter." });
      } else {
        res.json(transactions);
      }
    } catch (error) {
      res
        .status(422)
        .json({ message: "No transactions found that match the filter." });
    }
  },
  getTransactionByID: async function (req, res) {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404).json({ message: "Transaction doesn't exist." });
    } else {
      res.json(transaction);
    }
  },
  updateTransaction: async function (req, res) {
    const { description, amount, category, transactionType } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404).json({ message: "Transaction doesn't exist." });
    } else {
      transaction.description = description || transaction.description;
      transaction.amount = amount || transaction.amount;
      transaction.category = category || transaction.category;
      transaction.transactionType =
        transactionType || transaction.transactionType;

      await transaction.save();
      res.json(transaction);
    }
  },
  deleteTransaction: async function (req, res) {
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) {
        res.status(404).json({ message: "Transaction doesn't exist." });
      } else {
        await transaction.remove();
        res.json({ message: "Transaction deleted successfully." });
      }
    } catch (error) {
      res.status(422).json(error);
    }
  },
  filterTransaction: async function (req, res) {
    try {
      const { month, year, category } = req.body;

      let monthParsed, yearParsed, transactions;

      // Format year
      if (year) {
        yearParsed = year;
      } else {
        yearParsed = new Date().getFullYear();
      }

      // Format month
      if (month) {
        switch (month.toLowerCase()) {
          case "january":
            monthParsed = 1;
            break;
          case "february":
            monthParsed = 2;
            break;
          case "march":
            monthParsed = 3;
            break;
          case "april":
            monthParsed = 4;
            break;
          case "may":
            monthParsed = 5;
            break;
          case "june":
            monthParsed = 6;
            break;
          case "july":
            monthParsed = 7;
            break;
          case "august":
            monthParsed = 8;
            break;
          case "september":
            monthParsed = 9;
            break;
          case "october":
            monthParsed = 10;
            break;
          case "november":
            monthParsed = 11;
            break;
          case "december":
            monthParsed = 12;
            break;

          default:
            monthParsed = null;
            break;
        }
      }

      // Query DB based on req.body
      if (month && category) {
        transactions = await Transaction.find({
          user: req.user._id,
          date: {
            $gte: `${yearParsed}-${monthParsed}-01`,
            $lte: `${yearParsed}-${monthParsed}-31`,
          },
          category: category,
        });
      } else if (!month && category) {
        transactions = await Transaction.find({
          user: req.user._id,
          category: category,
        });
      } else if (month && !category) {
        transactions = await Transaction.find({
          user: req.user._id,
          date: {
            $gte: `${yearParsed}-${monthParsed}-01`,
            $lte: `${yearParsed}-${monthParsed}-31`,
          },
        });
      } else if (!month && !year && !category) {
        transactions = await Transaction.find({ user: req.user._id });
      }

      // Check for DB results
      if (!transactions.length) {
        res
          .status(404)
          .json({ message: "No transactions found that match the criteria." });
      } else {
        res.json(transactions);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  },
};
