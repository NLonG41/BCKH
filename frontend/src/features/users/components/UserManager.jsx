import { useI18n } from "../../../contexts/I18nContext.jsx";
import { useUsers } from "../hooks";

const UserManager = ({ users, onUpdated, onMessage }) => {
  const { t } = useI18n();
  const { toggleUserActive, resetUserPassword, deleteUser } = useUsers();
  
  const handleToggle = async (id) => {
    try {
      await toggleUserActive(id);
      onMessage?.(t("userStatusChanged"));
      onUpdated?.();
    } catch (error) {
      onMessage?.(error.response?.data?.message || t("cannotUpdateUser"));
    }
  };

  const handleReset = async (id, username) => {
    const newPassword = window.prompt(`${t("enterNewPassword")} ${username} (${t("defaultPassword")}):`, "");
    try {
      const response = await resetUserPassword(id, newPassword || undefined);
      onMessage?.(`${t("passwordResetSuccess")} (${response.tempPassword}).`);
    } catch (error) {
      onMessage?.(error.response?.data?.message || t("cannotResetPassword"));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t("confirmDeleteUser"))) return;
    try {
      await deleteUser(id);
      onMessage?.(t("userDeleted"));
      onUpdated?.();
    } catch (error) {
      onMessage?.(error.response?.data?.message || t("cannotDeleteUser"));
    }
  };

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
      {users.map((user) => (
        <div
          key={user._id}
          className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition-colors"
        >
          <div>
            <p className="font-semibold text-gray-900">{user.fullName}</p>
            <p className="text-xs text-gray-600 mt-1">{user.email}</p>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                user.isActive 
                  ? "bg-emerald-100 text-emerald-700" 
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {user.isActive ? t("active") : t("locked")}
            </span>
          </div>
          <div className="flex gap-3 text-sm">
            <button 
              onClick={() => handleReset(user._id, user.username)} 
              className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors"
            >
              {t("resetPassword")}
            </button>
            <button 
              onClick={() => handleToggle(user._id)} 
              className="text-amber-600 hover:text-amber-700 font-medium hover:underline transition-colors"
            >
              {user.isActive ? t("lock") : t("unlock")}
            </button>
            <button 
              onClick={() => handleDelete(user._id)} 
              className="text-rose-600 hover:text-rose-700 font-medium hover:underline transition-colors"
            >
              {t("delete")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserManager;

