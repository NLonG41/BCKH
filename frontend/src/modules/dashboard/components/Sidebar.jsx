import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import { useSidebar } from "./SidebarContext.jsx";

// Icon components
const HomeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const BooksIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const MyLoansIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const HistoryIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ManageLoansIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const ManageBooksIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const NotificationsIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const location = useLocation();
  const { collapsed, setCollapsed } = useSidebar();

  const studentMenus = [
    { path: "/", label: t("home"), icon: HomeIcon },
    { path: "/books", label: t("books"), icon: BooksIcon },
    { path: "/my-loans", label: t("myLoans"), icon: MyLoansIcon },
    { path: "/history", label: t("history"), icon: HistoryIcon }
  ];

  const librarianMenus = [
    { path: "/", label: t("home"), icon: HomeIcon },
    { path: "/loans", label: t("manageLoans"), icon: ManageLoansIcon },
    { path: "/books", label: t("manageBooks"), icon: ManageBooksIcon },
    { path: "/users", label: t("manageUsers"), icon: UsersIcon },
    { path: "/notifications", label: t("notifications"), icon: NotificationsIcon }
  ];

  const menus = user?.role === "librarian" || user?.role === "assistant" || user?.role === "admin" 
    ? librarianMenus 
    : studentMenus;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full z-50 pt-16 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.2)"
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all z-10 hidden lg:flex items-center justify-center"
          aria-label={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <nav className="p-4 space-y-2 h-full overflow-y-auto">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => {
                onClose();
                if (window.innerWidth < 1024) setCollapsed(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                isActive(menu.path)
                  ? "bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20 text-cyan-300 font-semibold border border-cyan-400/30 shadow-lg shadow-cyan-500/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white hover:shadow-md hover:shadow-cyan-500/10 border border-transparent"
              }`}
              title={collapsed ? menu.label : ""}
            >
              {menu.icon && (
                <menu.icon className={`w-5 h-5 flex-shrink-0 ${isActive(menu.path) ? "text-cyan-300" : "text-slate-400 group-hover:text-white"}`} />
              )}
              <span
                className={`text-sm transition-all duration-300 ${
                  collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                }`}
              >
                {menu.label}
              </span>
              
              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {menu.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              )}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

