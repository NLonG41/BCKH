import { useEffect, useState } from "react";
import { loanApi } from "../../../services/loanApi.js";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import LoanHistory from "../components/LoanHistory.jsx";

const HistoryPage = () => {
  const { t } = useI18n();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loanApi
      .history()
      .then(setHistory)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{t("loanHistory")}</h1>
        <p className="text-base text-gray-700 leading-relaxed">{t("loanHistory")}</p>
      </div>

      <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        {loading ? (
          <p className="text-sm text-gray-500">{t("loading")}</p>
        ) : (
          <LoanHistory items={history} />
        )}
      </section>
    </div>
  );
};

export default HistoryPage;

