import { useState } from "react";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import BookDescriptionModal from "./BookDescriptionModal.jsx";

const BookCatalog = ({
  books,
  categories,
  selectedCategory,
  onCategoryChange,
  onBorrow,
  borrowing
}) => {
  const { t } = useI18n();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered =
    selectedCategory === "all"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  const handleViewDescription = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-sm">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {t("filterByCategory")}
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="flex-1 max-w-xs border-2 border-indigo-200 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        >
          <option value="all">{t("allCategories")}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((book) => (
          <div
            key={book._id}
            className="group bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 border-2 border-indigo-200 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-indigo-400 relative overflow-hidden"
          >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col flex-1">
              {/* Book Cover Image */}
              {book.coverUrl ? (
                <div className="mb-4 -mt-6 -mx-6">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-56 object-cover rounded-t-2xl"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="mb-4 -mt-6 -mx-6 h-56 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-t-2xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              )}

              {/* Category Badge */}
              <div className="mb-3 px-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border border-indigo-200">
                  {book.category}
                </span>
              </div>

              {/* Book Info */}
              <div className="mb-4 flex-1 px-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3rem]">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {book.author}
                </p>
              </div>

              {/* Stats and Actions */}
              <div className="space-y-3 mt-auto px-6 pb-6">
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg backdrop-blur-sm border border-gray-100">
                  <div className="flex items-center gap-2">
                    {book.quantity > 0 ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-600 font-medium">{t("available")}</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-gray-600 font-medium">{t("outOfStock")}</span>
                      </>
                    )}
                  </div>
                  <span className={`text-lg font-bold ${book.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                    {book.quantity} {t("books")}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDescription(book)}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-indigo-300/50 hover:shadow-xl hover:shadow-indigo-400/50 flex items-center justify-center gap-2 group/btn"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{t("description")}</span>
                  </button>
                  <button
                    disabled={book.quantity === 0 || borrowing === book._id}
                    onClick={() => onBorrow(book._id)}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      book.quantity === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : borrowing === book._id
                        ? "bg-yellow-400 text-yellow-900"
                        : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-300/50 hover:shadow-xl hover:shadow-emerald-400/50"
                    }`}
                  >
                    {book.quantity === 0 ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>{t("outOfStock")}</span>
                      </>
                    ) : borrowing === book._id ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{t("processing")}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>{t("borrow")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-gray-500 text-lg font-medium">Chưa có sách thuộc thể loại này.</p>
          </div>
        )}
      </div>

      <BookDescriptionModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBook(null);
        }}
      />
    </div>
  );
};

export default BookCatalog;

