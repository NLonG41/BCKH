import { useEffect, useState } from "react";
import { bookApi } from "../../../services/bookApi.js";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import BookManager from "../components/BookManager.jsx";

const BooksManagementPage = () => {
  const { t } = useI18n();
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const refreshBooks = async () => {
    const data = await bookApi.list();
    setBooks(data);
  };

  useEffect(() => {
    refreshBooks();
  }, []);

  return (
    <div className="space-y-6">
      {message && (
        <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded border border-amber-200">
          {message}
        </div>
      )}

      <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{t("manageBooks")}</h2>
          <p className="text-base text-gray-700 font-medium">{books.length} {t("totalBooks")}</p>
        </div>
        <BookManager books={books} onUpdated={refreshBooks} onMessage={setMessage} />
      </section>
    </div>
  );
};

export default BooksManagementPage;

