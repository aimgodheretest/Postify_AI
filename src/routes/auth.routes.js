const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();

/*
POST/register
POST/login
GET/user[protected]
*/
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const isUsernameExist = await userModel.findOne({
    username,
  });

  if(isUsernameExist){
    return res.status(409).json({
        message:"Username Already Exist"
    })
  }

  const user = await userModel.create({
    username,
    password,
  });

  res.status(201).json({
    message: "User Created Successfully",
    user,
  });
});

module.exports = router;
