import { useState } from "react";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import BookDescriptionModal from "../../books/components/BookDescriptionModal.jsx";

const RecommendationList = ({ books }) => {
  const { t } = useI18n();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!books.length) {
    return <p className="text-sm text-slate-500">{t("noRecommendations")}</p>;
  }

  const handleViewDescription = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="group bg-gradient-to-br from-white via-pink-50/30 to-rose-50/30 border-2 border-pink-200 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-pink-400 relative overflow-hidden"
          >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="w-full h-full bg-gradient-to-br from-pink-400 to-rose-500 rounded-full blur-3xl"></div>
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
                <div className="mb-4 -mt-6 -mx-6 h-56 bg-gradient-to-br from-pink-100 to-rose-100 rounded-t-2xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              )}

              {/* Recommendation Badge */}
              <div className="mb-3 flex items-center gap-2 px-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 border border-pink-200">
                  ⭐ {t("recommendation")}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
                  {book.category}
                </span>
              </div>

              {/* Book Info */}
              <div className="mb-4 flex-1 px-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[3rem]">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {book.author}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleViewDescription(book)}
                className="w-full mx-6 mb-6 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:from-pink-600 hover:via-rose-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-pink-300/50 hover:shadow-xl hover:shadow-pink-400/50 flex items-center justify-center gap-2 group/btn"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{t("viewDescription")}</span>
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <BookDescriptionModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBook(null);
        }}
      />
    </>
  );
};

export default RecommendationList;

