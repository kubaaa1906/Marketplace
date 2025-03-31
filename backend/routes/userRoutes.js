const express = require('express');
const {registerUser, loginUser, getUser} = require("../controllers/userController")
const router = express.Router();
const authorizeRoles = require("../middleware/authorizeRoles");
const tokenVerification = require("../middleware/tokenVerification");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", tokenVerification, getUser);

module.exports = router;
