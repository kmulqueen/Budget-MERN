const router = require("express").Router();
const budgetController = require("../../controllers/budgetController");
const { protect } = require("../../middleware/authMiddleware");

// Matches with "/api/budget/get-item/:itemtype/:budgetid/:itemid"
router
  .route("/get-item/:itemtype/:budgetid/:itemid")
  .get(protect, budgetController.getBudgetItem);

// Matches with "/api/budget/update-item/:itemtype/:budgetid/:itemid"
router
  .route("/update-item/:itemtype/:budgetid/:itemid")
  .put(protect, budgetController.updateBudgetItem);

// Matches with "/api/budget/create"
router.route("/create").post(protect, budgetController.createBudget);

// Matches with "/api/budget/update"
router.route("/update").put(protect, budgetController.addBudgetItems);

// Matches with "/api/budget"
router.route("/").get(protect, budgetController.getUserBudget);

module.exports = router;
