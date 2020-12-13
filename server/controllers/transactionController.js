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
      const transactions = await Transaction.find({ user: req.user._id });

      if (!transactions.length) {
        res
          .status(404)
          .json({ message: "No transactions found for this user." });
      } else {
        res.json(transactions);
      }
    } catch (error) {
      res.status(422).json(error);
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
};
