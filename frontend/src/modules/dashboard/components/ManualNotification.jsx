import { useState } from "react";
import { notificationApi } from "../../../services/notificationApi.js";
import { useI18n } from "../../../contexts/I18nContext.jsx";

const ManualNotification = ({ users, onSent, onMessage }) => {
  const { t } = useI18n();
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!target || !message.trim()) return;
    setSending(true);
    try {
      await notificationApi.create({ userId: target, message });
      setMessage("");
      onMessage?.(t("notificationSent"));
      onSent?.();
    } catch (error) {
      onMessage?.(error.response?.data?.message || t("cannotSendNotification"));
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <select
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        required
      >
        <option value="" className="text-gray-500">{t("selectUser")}</option>
        {users.map((user) => (
          <option key={user._id} value={user._id} className="text-gray-900 bg-white">
            {user.fullName} ({user.username})
          </option>
        ))}
      </select>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t("message")}
        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        required
      />
      <button
        type="submit"
        disabled={sending}
        className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-500 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? t("sending") || "Đang gửi..." : t("send")}
      </button>
    </form>
  );
};

export default ManualNotification;

