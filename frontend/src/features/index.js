// Features Index - Central export for all features
export * from "./books";
export * from "./loans";
export * from "./users";
export * from "./notifications";
export * from "./stats";
export * from "./recommendations";
export * from "./home";

// Explicit exports for pages
export { default as HomePage } from "./home/pages/HomePage.jsx";
export { default as LibrarianHomePage } from "./home/pages/LibrarianHomePage.jsx";
export { default as BooksPage } from "./books/pages/BooksPage.jsx";
export { default as BooksManagementPage } from "./books/pages/BooksManagementPage.jsx";
export { default as MyLoansPage } from "./loans/pages/MyLoansPage.jsx";
export { default as HistoryPage } from "./loans/pages/HistoryPage.jsx";
export { default as LoansManagementPage } from "./loans/pages/LoansManagementPage.jsx";
export { default as UsersManagementPage } from "./users/pages/UsersManagementPage.jsx";
export { default as NotificationsPage } from "./notifications/pages/NotificationsPage.jsx";
export { default as StatsPage } from "./stats/pages/StatsPage.jsx";

