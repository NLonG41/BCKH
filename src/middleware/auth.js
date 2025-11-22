import { verifyJwt } from "../utils/jwt.js";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }
  try {
    const decoded = verifyJwt(header.split(" ")[1]);
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = { id: user._id, role: user.role, username: user.username };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const allowRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };

