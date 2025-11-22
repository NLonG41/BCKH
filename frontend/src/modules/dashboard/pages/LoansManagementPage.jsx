import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { loanApi } from "../../../services/loanApi.js";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import LibrarianLoanTable from "../components/LibrarianLoanTable.jsx";

const LoansManagementPage = () => {
  const { t } = useI18n();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadLoans = async () => {
    setLoading(true);
    try {
      const data = await loanApi.manageAll();
      setLoans(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLoans();
  }, []);

  const handleConfirm = async (loanId) => {
    try {
      await loanApi.confirmReturn(loanId);
      setMessage(t("returnConfirmed"));
      await loadLoans();
    } catch (error) {
      setMessage(error.response?.data?.message || t("updateLoanFailed"));
    }
  };

  const handleOverdueScan = async () => {
    try {
      setMessage("");
      const response = await loanApi.runOverdueScan();
      setMessage(response.message);
      await loadLoans();
    } catch (error) {
      setMessage(error.response?.data?.message || t("scanFailed"));
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded border border-amber-200">
          {message}
        </div>
      )}

      <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{t("manageLoans")}</h2>
            <p className="text-base text-gray-700 font-medium">{t("totalLoans")}: {loans.length} {t("loans")}</p>
          </div>
          <button
            onClick={handleOverdueScan}
            className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {t("scanOverdue")}
          </button>
        </div>
        <LibrarianLoanTable loans={loans} loading={loading} onConfirm={handleConfirm} />
      </section>
    </div>
  );
};

export default LoansManagementPage;

