import { useState } from "react";
import dayjs from "dayjs";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { useI18n } from "../../contexts/I18nContext.jsx";
import NotificationBell from "../../features/notifications/components/NotificationBell.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { SidebarProvider, useSidebar } from "./components/SidebarContext.jsx";
import { HomePage, BooksPage, MyLoansPage, HistoryPage } from "../../features";
import LanguageSwitcher from "../../components/LanguageSwitcher.jsx";

const StudentDashboardContent = () => {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <header
        className={`bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          collapsed ? "lg:left-20" : "lg:left-64"
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {sidebarOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <div>
            <p className="text-sm font-medium text-gray-600">{t("welcome")}</p>
            <h1 className="text-xl font-bold text-gray-900 mt-0.5">{user?.fullName || user?.username}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {t("today")}: {dayjs().format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <NotificationBell />
          <button onClick={logout} className="text-sm text-rose-600 font-medium hover:text-rose-700">
            {t("logout")}
          </button>
        </div>
      </header>

      <main
        className={`pt-20 px-6 py-8 transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/my-loans" element={<MyLoansPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
    </div>
  );
};

const StudentDashboard = () => {
  return (
    <SidebarProvider>
      <StudentDashboardContent />
    </SidebarProvider>
  );
};

export default StudentDashboard;

