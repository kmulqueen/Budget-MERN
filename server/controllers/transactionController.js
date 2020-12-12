const Transaction = require("../models/").Transaction;

module.exports = {
  createTransaction: async function (req, res) {
    try {
      const { transactionType, description, amount, category, date } = req.body;

      const newTransaction = new Transaction({
        user: req.user._id,
        transactionType,
        description,
        amount,
        category,
        date,
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
};
