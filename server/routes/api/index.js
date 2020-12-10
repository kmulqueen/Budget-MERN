const router = require("express").Router();
const userRoutes = require("./userRoutes");
const budgetRoutes = require("./budgetRoutes");
const transactionRoutes = require("./transactionRoutes");

router.use("/users", userRoutes);
router.use("/budget", budgetRoutes);
router.use("/transaction", transactionRoutes);

module.exports = router;
