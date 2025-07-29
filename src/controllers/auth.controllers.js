const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerController(req, res) {
  const { username, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    username,
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "Username Already Exist",
    });
  }
  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "User Created Successfully",
    user,
  });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });
  if (!user) {
    return res.status(400).json({
      message: "User Not Found",
    });
  }

  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "User Logged Inn",
    user: {
      username: user.username,
      id: user._id,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
