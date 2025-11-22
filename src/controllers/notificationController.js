import Notification from "../models/Notification.js";

export const listNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(notifications);
};

export const markAsRead = async (req, res) => {
  await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { isRead: true }
  );
  res.json({ message: "Đã đánh dấu đã đọc" });
};

export const createNotification = async (req, res) => {
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ message: "Thiếu thông tin thông báo" });
  }
  const notification = await Notification.create({
    user: userId,
    message
  });
  res.status(201).json(notification);
};

