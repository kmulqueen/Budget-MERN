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
};
