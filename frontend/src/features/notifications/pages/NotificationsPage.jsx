import { useState, useEffect } from "react";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import { useUsers } from "../../users/hooks";
import ManualNotification from "../components/ManualNotification.jsx";

const NotificationsPage = () => {
  const { t } = useI18n();
  const { users } = useUsers();
  const [message, setMessage] = useState("");

  // Auto-dismiss message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="space-y-6">
      {message && (
        <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-lg border border-emerald-200 shadow-sm flex items-center justify-between animate-fadeIn">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {message}
          </span>
          <button
            onClick={() => setMessage("")}
            className="text-emerald-600 hover:text-emerald-800 transition-colors ml-4"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">{t("sendNotification")}</h2>
        <ManualNotification users={users} onMessage={setMessage} />
      </section>
    </div>
  );
};

export default NotificationsPage;

