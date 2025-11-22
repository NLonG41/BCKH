import { useI18n } from "../../../contexts/I18nContext.jsx";
import { useTopBooks } from "../../books/hooks";
import TopBorrowed from "../../books/components/TopBorrowed.jsx";

const HomePage = () => {
  const { t } = useI18n();
  const { topBooks } = useTopBooks(5);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{t("welcomeToLibrary")}</h1>
        <p className="text-base text-gray-700 leading-relaxed">{t("librarySystem")}</p>
      </div>

      <section className="bg-white rounded-xl p-6 space-y-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{t("topBorrowed")}</h2>
        </div>
        <TopBorrowed books={topBooks} />
      </section>
    </div>
  );
};

export default HomePage;

