import { useState } from "react";
import dayjs from "dayjs";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import BookDescriptionModal from "./BookDescriptionModal.jsx";

const LoanHistory = ({ items }) => {
  const { t } = useI18n();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!items.length) {
    return <p className="text-sm text-slate-500">{t("noHistory")}</p>;
  }

  const handleViewDescription = (book) => {
    if (book) {
      setSelectedBook(book);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="space-y-3">
        {items.slice(0, 5).map((loan) => (
          <div key={loan._id} className="border rounded-xl p-4">
            <div className="flex gap-4 items-center">
              {loan.book?.coverUrl && (
                <img
                  src={loan.book.coverUrl}
                  alt={loan.book.title}
                  className="w-16 h-24 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{loan.book?.title}</p>
                <p className="text-xs text-slate-500">
                  {t("borrowDate")}: {dayjs(loan.borrowDate).format("DD/MM/YYYY")} | {t("dueDate")}:{" "}
                  {dayjs(loan.dueDate).format("DD/MM/YYYY")}
                </p>
                {loan.book && (
                  <button
                    onClick={() => handleViewDescription(loan.book)}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium mt-1"
                  >
                    {t("viewDescription")} →
                  </button>
                )}
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  loan.status === "returned"
                    ? "bg-emerald-50 text-emerald-600"
                    : loan.status === "overdue"
                    ? "bg-rose-50 text-rose-600"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {loan.status === "returned"
                  ? t("returned")
                  : loan.status === "overdue"
                  ? t("overdue")
                  : t("borrowed")}
              </span>
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

export default LoanHistory;

