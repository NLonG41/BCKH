import { useEffect, useMemo, useState } from "react";
import { bookApi } from "../../../services/bookApi.js";
import { loanApi } from "../../../services/loanApi.js";
import { recommendationApi } from "../../../services/recommendationApi.js";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import BookCatalog from "../components/BookCatalog.jsx";
import RecommendationList from "../components/RecommendationList.jsx";

const BooksPage = () => {
  const { t } = useI18n();
  const [books, setBooks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [borrowingId, setBorrowingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const [bookRes, recRes] = await Promise.all([bookApi.list(), recommendationApi.list()]);
    setBooks(bookRes);
    setRecommendations(recRes);
  };

  useEffect(() => {
    loadData();
  }, []);

  const categories = useMemo(
    () => [...new Set(books.map((book) => book.category))],
    [books]
  );

  const handleBorrow = async (bookId) => {
    try {
      setBorrowingId(bookId);
      setMessage("");
      await loanApi.borrow(bookId);
      setMessage(t("borrowSuccess"));
      await loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || t("borrowFailed"));
    } finally {
      setBorrowingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm border border-emerald-200">
          {message}
        </div>
      )}

      <section className="bg-white rounded-xl p-6 space-y-4 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">{t("bookList")}</h2>
        <BookCatalog
          books={books}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onBorrow={handleBorrow}
          borrowing={borrowingId}
        />
      </section>

      <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold mb-4 text-gray-900">{t("recommendations")}</h2>
        <RecommendationList books={recommendations} />
      </section>
    </div>
  );
};

export default BooksPage;

