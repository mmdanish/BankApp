import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using your secret
    req.user = decoded; // Attach the decoded token payload to the request object
    next(); // Call the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};
