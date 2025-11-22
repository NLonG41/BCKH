import { useState } from "react";
import { useI18n } from "../../../contexts/I18nContext.jsx";

const BookDescriptionModal = ({ book, isOpen, onClose }) => {
  const { t } = useI18n();
  
  if (!isOpen || !book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl border-2 border-indigo-200 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{book.title}</h2>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-indigo-100 font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {book.author}
                </p>
                <span className="inline-flex items-center px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30">
                  {book.category}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 flex-shrink-0"
              aria-label={t("close")}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(85vh-180px)]">
          {/* Book Cover Image */}
          {book.coverUrl && (
            <div className="mb-6 flex justify-center">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="max-w-xs w-full h-96 object-cover rounded-xl shadow-2xl border-4 border-white"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-900">{t("description")}</h3>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-inner">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {book.description || (
                  <span className="text-gray-400 italic">{t("noDescription")}</span>
                )}
              </p>
            </div>
          </div>

          {/* Stats if available */}
          {book.borrowedCount !== undefined && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">{t("borrowedCount")}</span>
                </div>
                <p className="text-2xl font-bold text-indigo-600">{book.borrowedCount} {t("times")}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">{t("remainingQuantity")}</span>
                </div>
                <p className="text-2xl font-bold text-emerald-600">{book.quantity || 0} {t("books")}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-indigo-300/50 hover:shadow-xl hover:shadow-indigo-400/50 flex items-center gap-2"
          >
            <span>{t("close")}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDescriptionModal;

