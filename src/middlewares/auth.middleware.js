const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorizerd Access,Please Login First",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      _id: decoded.id,
    });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token,Please Login",
    });
  }
}
module.exports = authMiddleware;
