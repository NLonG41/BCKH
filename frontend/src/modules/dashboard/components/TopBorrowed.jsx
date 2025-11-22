import { useState } from "react";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import BookDescriptionModal from "./BookDescriptionModal.jsx";

const TopBorrowed = ({ books }) => {
  const { t } = useI18n();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!books.length) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">{t("noBorrowData")}</p>
      </div>
    );
  }

  const handleViewDescription = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const getRankStyle = (index) => {
    if (index === 0) {
      return {
        badge: "bg-gradient-to-br from-amber-500 to-yellow-600 text-white",
        badgeText: "1",
        card: "bg-white border border-amber-200/50 shadow-lg shadow-amber-100/30",
        accent: "from-amber-50 to-yellow-50"
      };
    } else if (index === 1) {
      return {
        badge: "bg-gradient-to-br from-slate-400 to-gray-500 text-white",
        badgeText: "2",
        card: "bg-white border border-slate-200/50 shadow-lg shadow-slate-100/30",
        accent: "from-slate-50 to-gray-50"
      };
    } else if (index === 2) {
      return {
        badge: "bg-gradient-to-br from-orange-400 to-amber-500 text-white",
        badgeText: "3",
        card: "bg-white border border-orange-200/50 shadow-lg shadow-orange-100/30",
        accent: "from-orange-50 to-amber-50"
      };
    } else {
      return {
        badge: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
        badgeText: `${index + 1}`,
        card: "bg-white border border-indigo-100 shadow-md shadow-indigo-50/20",
        accent: "from-indigo-50/30 to-purple-50/30"
      };
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => {
          const rankStyle = getRankStyle(index);
          return (
            <div
              key={book._id}
              className={`${rankStyle.card} rounded-xl p-0 transition-all duration-300 hover:shadow-xl group relative overflow-hidden`}
            >
              <div className="relative z-10 p-6">
                {/* Book Cover Image with Rank Badge Overlay */}
                {book.coverUrl ? (
                  <div className="mb-4 -mt-2 -mx-2 relative">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded-t-2xl"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    {/* Rank Badge - Overlay on image */}
                    <div className="absolute top-3 left-3">
                      <div className={`${rankStyle.badge} w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg backdrop-blur-sm`}>
                        {rankStyle.badgeText}
                      </div>
                    </div>
                    {/* Borrow Count - Overlay on image */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white text-sm font-semibold">{book.borrowedCount}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`mb-4 -mt-2 -mx-2 h-48 bg-gradient-to-br ${rankStyle.accent} rounded-t-2xl relative flex items-center justify-center`}>
                    {/* Rank Badge - On placeholder */}
                    <div className="absolute top-3 left-3">
                      <div className={`${rankStyle.badge} w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg`}>
                        {rankStyle.badgeText}
                      </div>
                    </div>
                    {/* Borrow Count - On placeholder */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white text-sm font-semibold">{book.borrowedCount}</span>
                      </div>
                    </div>
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}

                {/* Book Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2.5">
                    {book.author}
                  </p>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                      {book.category}
                    </span>
                  </div>
                </div>

                {/* Stats - Compact */}
                <div className="flex items-center justify-between mb-4 px-2">
                  <span className="text-xs text-gray-500 font-medium">{t("borrowedCount")}</span>
                  <span className="text-base font-semibold text-gray-700">{book.borrowedCount}</span>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleViewDescription(book)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow-md"
                >
                  <span>{t("viewDescription")}</span>
                  <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
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

export default TopBorrowed;

