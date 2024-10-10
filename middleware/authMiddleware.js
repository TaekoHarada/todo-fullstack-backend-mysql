import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Middleware to verify JWT
export const authenticateToken = (req, res, next) => {
  // Get the token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
