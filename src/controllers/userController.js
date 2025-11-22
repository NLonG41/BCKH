import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const listUsers = async (_req, res) => {
  const users = await User.find({ role: "user" })
    .select("username fullName email role isActive createdAt")
    .sort({ createdAt: -1 });
  res.json(users);
};

export const toggleActive = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, role: "user" });
  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy sinh viên" });
  }
  user.isActive = !user.isActive;
  await user.save();
  res.json({ isActive: user.isActive });
};

export const resetPassword = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, role: "user" });
  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy sinh viên" });
  }
  const tempPassword = req.body.newPassword?.trim() || "123456";
  user.passwordHash = await bcrypt.hash(tempPassword, 10);
  await user.save();
  res.json({ message: "Đã đặt lại mật khẩu", tempPassword });
};

export const deleteUser = async (req, res) => {
  const deleted = await User.findOneAndDelete({ _id: req.params.id, role: "user" });
  if (!deleted) {
    return res.status(404).json({ message: "Không tìm thấy sinh viên" });
  }
  res.json({ message: "Đã xóa tài khoản" });
};

