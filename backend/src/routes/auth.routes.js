const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controllers");
const router = express.Router();

/*
POST/register
POST/login
GET/user[protected]
*/
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
