const jwt = require("jsonwebtoken");
require("dotenv").config();

function authorize(roles = []) {
  // Convert string to an array containing that role
  if (typeof roles === "string") {
    roles = [roles];
  }
  return (req, res, next) => {
    // Get token from the request header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token is invalid" });
      }

      // Check if user role is authorized
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Authentication and authorization successful
      req.user = decoded; // Attach decoded user information to the request
      next();
    });
  };
}
module.exports = authorize;
