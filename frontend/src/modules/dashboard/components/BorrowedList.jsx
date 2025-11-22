import { useState } from "react";
import dayjs from "dayjs";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import BookDescriptionModal from "./BookDescriptionModal.jsx";

const BorrowedList = ({ items }) => {
  const { t } = useI18n();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!items.length) {
    return <p className="text-sm text-slate-300">{t("noActiveLoans")}</p>;
  }

  const handleViewDescription = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-3">
        {items.map((loan) => {
          const dueDate = dayjs(loan.dueDate).format("DD/MM/YYYY");
          const overdue = dayjs().isAfter(loan.dueDate, "day");
          return (
            <div
              key={loan._id}
              className="flex items-center gap-4 border border-white/10 rounded-lg px-4 py-3 bg-white/5 backdrop-blur"
            >
              {loan.book.coverUrl && (
                <img
                  src={loan.book.coverUrl}
                  alt={loan.book.title}
                  className="w-16 h-24 object-cover rounded-lg border border-white/20 flex-shrink-0"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">{loan.book.title}</p>
                <p className="text-sm text-slate-300">
                  {t("dueDate")}:{" "}
                  <span className={overdue ? "text-rose-500 font-medium" : ""}>{dueDate}</span>
                </p>
                <button
                  onClick={() => handleViewDescription(loan.book)}
                  className="text-xs text-cyan-300 hover:text-cyan-200 font-medium mt-1"
                >
                  {t("viewDescription")} →
                </button>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  overdue ? "bg-rose-500/20 text-rose-100" : "bg-emerald-400/20 text-emerald-100"
                }`}
              >
                {overdue ? t("overdue") : t("borrowed")}
              </span>
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

export default BorrowedList;

