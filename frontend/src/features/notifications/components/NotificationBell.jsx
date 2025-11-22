import { useState } from "react";
import dayjs from "dayjs";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import { useNotifications } from "../hooks";

const NotificationBell = ({ onRead }) => {
  const { t } = useI18n();
  const { notifications, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);
      onRead?.();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <div className="relative">
      <button
        className="relative p-3 rounded-full bg-indigo-50 text-indigo-600"
        onClick={() => setOpen((prev) => !prev)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl p-4 z-10 max-h-96 overflow-y-auto">
          <h3 className="font-semibold mb-2">{t("notifications")}</h3>
          {notifications.length === 0 && (
            <p className="text-sm text-slate-500">{t("noNotifications")}</p>
          )}
          <ul className="space-y-3">
            {notifications.map((notif) => (
              <li key={notif._id} className="border rounded-lg p-3">
                <p className="text-sm text-slate-600">{notif.message}</p>
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>{dayjs(notif.createdAt).format("HH:mm DD/MM")}</span>
                  {!notif.isRead && (
                    <button onClick={() => handleMarkRead(notif._id)} className="text-indigo-500">
                      {t("markAsRead")}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

