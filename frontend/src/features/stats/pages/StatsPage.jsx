import { useI18n } from "../../../contexts/I18nContext.jsx";
import { useStats } from "../hooks";
import StatsCards from "../components/StatsCards.jsx";

const StatsPage = () => {
  const { t } = useI18n();
  const { stats, loading } = useStats();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thống kê</h1>
        <p className="text-gray-600">Tổng quan hệ thống thư viện</p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Đang tải...</p>
      ) : (
        <StatsCards stats={stats} />
      )}
    </div>
  );
};

export default StatsPage;

