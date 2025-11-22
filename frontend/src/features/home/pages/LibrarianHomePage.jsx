import { useI18n } from "../../../contexts/I18nContext.jsx";

const LibrarianHomePage = () => {
  const { t } = useI18n();
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("welcomeToManagement")}</h1>
        <p className="text-base text-gray-700 leading-relaxed">{t("libraryOverview")}</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t("usageGuide")}</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-semibold mt-0.5">•</span>
            <span><strong className="text-gray-900">{t("manageLoans")}:</strong> {t("guideManageLoans")}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-semibold mt-0.5">•</span>
            <span><strong className="text-gray-900">{t("manageBooks")}:</strong> {t("guideManageBooks")}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-semibold mt-0.5">•</span>
            <span><strong className="text-gray-900">{t("manageUsers")}:</strong> {t("guideManageUsers")}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-semibold mt-0.5">•</span>
            <span><strong className="text-gray-900">{t("notifications")}:</strong> {t("guideNotifications")}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LibrarianHomePage;

