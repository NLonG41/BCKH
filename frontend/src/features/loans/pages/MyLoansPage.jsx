import { useI18n } from "../../../contexts/I18nContext.jsx";
import { useLoans } from "../hooks";
import BorrowedList from "../components/BorrowedList.jsx";

const MyLoansPage = () => {
  const { t } = useI18n();
  const { loans, loading, loadLoans } = useLoans();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{t("activeLoans")}</h1>
        <p className="text-base text-gray-700 leading-relaxed">{t("activeLoans")}</p>
      </div>

      <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        {loading ? (
          <p className="text-sm text-gray-500">{t("loading")}</p>
        ) : (
          <BorrowedList items={loans} onReturned={loadLoans} />
        )}
      </section>
    </div>
  );
};

export default MyLoansPage;

