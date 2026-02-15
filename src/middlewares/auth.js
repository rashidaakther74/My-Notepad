const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { loginUser } = require("../services/userServices");
const { jwtAccessKey } = require("../secret");

const verifyToken = (req, res, next) => {
    try {
  const authHeader = req.headers.authorization;
   if (!authHeader) throw createError(401, "No token provided");
    
   const token = authHeader.split(" ")[1];
   const decoded = jwt.verify(token, jwtAccessKey);
   req.user = decoded;
   next();
} catch (error) {
    next(createError(401, "Invalid or expired token"));
  }
}

const isAdmin = (req, res, next) => {
  if (!req.user) return next(createError(401, "Unauthorized"));
  if (!req.user.isAdmin) return next(createError(403, "Admin access only"));
  next();
};

module.exports = { isAdmin,verifyToken };
