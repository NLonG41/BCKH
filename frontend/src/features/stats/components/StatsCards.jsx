const cards = [
  { key: "totalTitles", label: "Tựa sách", accent: "text-cyan-300" },
  { key: "totalCopies", label: "Bản sách", accent: "text-emerald-300" },
  { key: "studentCount", label: "Sinh viên", accent: "text-amber-300" },
  { key: "activeLoans", label: "Đang mượn", accent: "text-fuchsia-300" },
  { key: "overdueLoans", label: "Quá hạn", accent: "text-rose-300" }
];

const StatsCards = ({ stats }) => {
  if (!stats) return null;
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className="border border-white/10 rounded-2xl p-4 bg-white/5 shadow-inner shadow-black/30"
        >
          <p className="text-xs uppercase text-slate-400 tracking-wide">{card.label}</p>
          <p className={`text-3xl font-semibold ${card.accent}`}>
            {stats[card.key] !== undefined ? stats[card.key] : "--"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

