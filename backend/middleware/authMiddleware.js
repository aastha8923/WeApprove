const jwt = require("jsonwebtoken");
const User = require("../Models/user");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1]; // Extract actual token
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key"); // Use actual secret key
    req.user = decoded; // Attach user details to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};