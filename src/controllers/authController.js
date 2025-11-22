import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signJwt } from "../utils/jwt.js";

const sanitize = (user) => ({
  id: user._id,
  username: user.username,
  fullName: user.fullName,
  email: user.email,
  role: user.role
});

export const register = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(409).json({ message: "Username or email already used" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, fullName, email, passwordHash, role: "user" });
    res.status(201).json({ user: sanitize(user), token: signJwt(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }
    if (!user.isActive) {
      return res.status(403).json({ message: "Tài khoản đã bị khóa. Liên hệ thủ thư." });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }
    user.lastLoginAt = new Date();
    await user.save();
    res.json({ user: sanitize(user), token: signJwt(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

