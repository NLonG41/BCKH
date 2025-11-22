import { useEffect, useState } from "react";
import { userApi } from "../../../services/userApi.js";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import ManualNotification from "../components/ManualNotification.jsx";

const NotificationsPage = () => {
  const { t } = useI18n();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const loadUsers = async () => {
    const data = await userApi.list();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="space-y-6">
      {message && (
        <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded border border-amber-200">
          {message}
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

