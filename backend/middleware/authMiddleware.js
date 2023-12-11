const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userData = require("../model/userModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer', 0)
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from the token
      req.user = await userData.findById(decoded.id).select("-password");

      next();
      
    } catch (error) {
      console.log(error);

      if (error.name === "JsonWebTokenError") {
        res.status(401);
        throw new Error("Invalid token");
      } else if (error.name === "TokenExpiredError") {
        res.status(401);
        throw new Error("Token expired");
      } else {
        res.status(401);
        throw new Error("Not authorized");
      }
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No token provided");
  }
});

module.exports = { protect };
