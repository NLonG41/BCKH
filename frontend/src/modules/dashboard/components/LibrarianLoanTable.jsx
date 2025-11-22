import dayjs from "dayjs";
import { useI18n } from "../../../contexts/I18nContext.jsx";

const LibrarianLoanTable = ({ loans, onConfirm, loading }) => {
  const { t } = useI18n();
  
  if (loading) {
    return <p className="text-sm text-slate-300">{t("loadingData")}</p>;
  }

  if (!loans.length) {
    return <p className="text-sm text-slate-300">{t("noLoansYet")}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b-2 border-gray-200">
            <th className="py-3 pr-4 font-semibold text-gray-700">{t("studentName")}</th>
            <th className="py-3 pr-4 font-semibold text-gray-700">{t("bookName")}</th>
            <th className="py-3 pr-4 font-semibold text-gray-700">{t("borrowDateLabel")}</th>
            <th className="py-3 pr-4 font-semibold text-gray-700">{t("dueDate")}</th>
            <th className="py-3 pr-4 font-semibold text-gray-700">{t("status")}</th>
            <th className="py-3 pr-4 text-right font-semibold text-gray-700">{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => {
            const overdue = dayjs().isAfter(loan.dueDate, "day") || loan.status === "overdue";
            return (
              <tr
                key={loan._id}
                className={`${overdue ? "bg-rose-50 border-l-4 border-rose-500" : "border-b border-gray-100 hover:bg-gray-50"} transition-colors`}
              >
                <td className="py-3 pr-4 font-medium text-gray-900">{loan.user?.fullName || loan.user?.username || "N/A"}</td>
                <td className="py-3 pr-4 text-gray-800">{loan.book?.title || "N/A"}</td>
                <td className="py-3 pr-4 text-gray-700">{dayjs(loan.borrowDate).format("DD/MM/YYYY")}</td>
                <td className="py-3 pr-4">
                  <span className={overdue ? "text-rose-600 font-bold" : "text-gray-700 font-medium"}>
                    {dayjs(loan.dueDate).format("DD/MM/YYYY")}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                    overdue 
                      ? "bg-rose-100 text-rose-700" 
                      : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {overdue ? t("overdue") : t("borrowed")}
                  </span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <button
                    onClick={() => onConfirm(loan._id)}
                    className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition-colors"
                  >
                    {t("receivedBook")}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LibrarianLoanTable;

