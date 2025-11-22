import { useState } from "react";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import { useUsers } from "../hooks";
import UserManager from "../components/UserManager.jsx";

const UsersManagementPage = () => {
  const { t } = useI18n();
  const { users, loadUsers } = useUsers();
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-6">
      {message && (
        <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded border border-amber-200">
          {message}
        </div>
      )}

      <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{t("manageUsers")}</h2>
          <p className="text-base text-gray-700 font-medium">{users.length} {t("totalAccounts")}</p>
        </div>
        <UserManager users={users} onUpdated={loadUsers} onMessage={setMessage} />
      </section>
    </div>
  );
};

export default UsersManagementPage;

