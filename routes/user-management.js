const router = require("express").Router();
const passport = require("passport");

// Controller middleware
const userManagementController = require("../controllers/user-management");

router.post("/signup", userManagementController.signUp);

router.post("/login", passport.authenticate("local"), userManagementController.login);

module.exports = router;
