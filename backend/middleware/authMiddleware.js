import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Extract token from the 'Authorization' header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Split to get token only (without "Bearer" prefix)
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded payload to request object
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    // Check specific error type for more accurate error response
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    } else {
      return res.status(500).json({ message: "Failed to authenticate token." });
    }
  }
};
