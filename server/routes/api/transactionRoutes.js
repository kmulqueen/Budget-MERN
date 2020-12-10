const router = require("express").Router();
const { protect } = require("../../middleware/authMiddleware");
const transactionController = require("../../controllers/transactionController");

// Matches with "/api/transaction"
router.route("/").post(protect, transactionController.createTransaction);

module.exports = router;
