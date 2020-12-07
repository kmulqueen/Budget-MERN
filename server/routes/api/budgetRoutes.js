const router = require("express").Router();
const budgetController = require("../../controllers/budgetController");
const { protect } = require("../../middleware/authMiddleware");

// Matches with "/api/budget/create"
router.route("/create").post(protect, budgetController.createBudget);

// Matches with "/api/budget/update"
router.route("/update").put(protect, budgetController.addBudgetItems);

// Matches with "/api/budget"
router.route("/").get(protect, budgetController.getUserBudget);

module.exports = router;
