const router = require("express").Router();
const budgetController = require("../../controllers/budgetController");
const { protect } = require("../../middleware/authMiddleware");

router.route("/create").post(protect, budgetController.createBudget);

module.exports = router;
