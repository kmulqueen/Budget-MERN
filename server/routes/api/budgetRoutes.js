const router = require("express").Router();
const budgetController = require("../../controllers/budgetController");

router.route("/test").get(budgetController.test);

module.exports = router;
