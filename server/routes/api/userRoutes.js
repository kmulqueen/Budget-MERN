const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/").get(userController.getAllUsers);
router.route("/").post(userController.createNewUser);

router.route("/login").post(userController.authenticateUser);

module.exports = router;
