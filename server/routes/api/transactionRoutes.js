const router = require("express").Router();
const { protect } = require("../../middleware/authMiddleware");
const transactionController = require("../../controllers/transactionController");

// Matches with "/api/transaction/:id"
router.route("/:id").get(protect, transactionController.getTransactionByID);

// Matches with "/api/transaction"
router
  .route("/")
  .post(protect, transactionController.createTransaction)
  .get(protect, transactionController.getUserTransactions);

module.exports = router;
