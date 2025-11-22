# Kiến trúc Frontend - Feature Slice Pattern

## Tổng quan

Dự án đã được refactor theo **Feature Slice Pattern** kết hợp với **Repository Pattern** cho data access và **Custom Hooks** cho business logic.

## Cấu trúc thư mục

```
frontend/src/
├── features/                    # Feature Slice Pattern
│   ├── books/                   # Feature: Quản lý sách
│   │   ├── api/                 # Repository Pattern
│   │   │   ├── bookRepository.js
│   │   │   └── index.js
│   │   ├── hooks/               # Custom Hooks cho business logic
│   │   │   ├── useBooks.js
│   │   │   ├── useTopBooks.js
│   │   │   └── index.js
│   │   ├── components/          # Components riêng của feature
│   │   │   ├── BookCatalog.jsx
│   │   │   ├── BookDescriptionModal.jsx
│   │   │   ├── BookManager.jsx
│   │   │   ├── TopBorrowed.jsx
│   │   │   └── ImageUpload.jsx
│   │   ├── pages/               # Pages của feature
│   │   │   ├── BooksPage.jsx
│   │   │   └── BooksManagementPage.jsx
│   │   └── index.js             # Public API của feature
│   │
│   ├── loans/                   # Feature: Quản lý mượn trả
│   │   ├── api/
│   │   │   ├── loanRepository.js
│   │   │   └── index.js
│   │   ├── hooks/
│   │   │   ├── useLoans.js
│   │   │   ├── useLoanHistory.js
│   │   │   ├── useLoanManagement.js
│   │   │   └── index.js
│   │   ├── components/
│   │   │   ├── BorrowedList.jsx
│   │   │   ├── LoanHistory.jsx
│   │   │   └── LibrarianLoanTable.jsx
│   │   ├── pages/
│   │   │   ├── MyLoansPage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   └── LoansManagementPage.jsx
│   │   └── index.js
│   │
│   ├── users/                   # Feature: Quản lý người dùng
│   │   ├── api/
│   │   │   ├── userRepository.js
│   │   │   └── index.js
│   │   ├── hooks/
│   │   │   ├── useUsers.js
│   │   │   └── index.js
│   │   ├── components/
│   │   │   └── UserManager.jsx
│   │   ├── pages/
│   │   │   └── UsersManagementPage.jsx
│   │   └── index.js
│   │
│   ├── notifications/           # Feature: Thông báo
│   │   ├── api/
│   │   │   ├── notificationRepository.js
│   │   │   └── index.js
│   │   ├── hooks/
│   │   │   ├── useNotifications.js
│   │   │   └── index.js
│   │   ├── components/
│   │   │   ├── ManualNotification.jsx
│   │   │   └── NotificationBell.jsx
│   │   ├── pages/
│   │   │   └── NotificationsPage.jsx
│   │   └── index.js
│   │
│   ├── stats/                   # Feature: Thống kê
│   │   ├── api/
│   │   │   ├── statsRepository.js
│   │   │   └── index.js
│   │   ├── hooks/
│   │   │   ├── useStats.js
│   │   │   └── index.js
│   │   ├── components/
│   │   │   └── StatsCards.jsx
│   │   ├── pages/
│   │   │   └── StatsPage.jsx
│   │   └── index.js
│   │
│   ├── recommendations/         # Feature: Gợi ý sách
│   │   ├── api/
│   │   │   ├── recommendationRepository.js
│   │   │   └── index.js
│   │   ├── hooks/
│   │   │   ├── useRecommendations.js
│   │   │   └── index.js
│   │   ├── components/
│   │   │   └── RecommendationList.jsx
│   │   └── index.js
│   │
│   ├── home/                    # Feature: Trang chủ
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── LibrarianHomePage.jsx
│   │   └── index.js
│   │
│   └── index.js                 # Central export cho tất cả features
│
├── modules/                     # Modules (Dashboard, Auth)
│   ├── dashboard/
│   │   ├── components/          # Shared components
│   │   │   ├── Sidebar.jsx
│   │   │   └── SidebarContext.jsx
│   │   ├── Dashboard.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── LibrarianDashboard.jsx
│   └── auth/
│       ├── AuthContext.jsx
│       └── Login.jsx
│
├── contexts/                    # Global contexts
│   └── I18nContext.jsx
│
├── services/                    # HTTP client và base services
│   └── http.js
│
└── components/                  # Global components
    └── LanguageSwitcher.jsx
```

## Các Pattern được áp dụng

### 1. Feature Slice Pattern

Mỗi feature được tổ chức thành một slice độc lập với:
- **api/**: Repository cho data access
- **hooks/**: Custom hooks cho business logic
- **components/**: UI components riêng của feature
- **pages/**: Pages sử dụng feature
- **index.js**: Public API của feature

### 2. Repository Pattern

Mỗi feature có repository riêng để:
- Tách biệt data access logic khỏi business logic
- Dễ dàng thay đổi data source (API, LocalStorage, etc.)
- Tập trung xử lý lỗi và transformation

**Ví dụ:**
```javascript
// features/books/api/bookRepository.js
class BookRepository {
  async getAll() {
    const { data } = await axiosClient.get("/books");
    return data;
  }
  // ...
}
```

### 3. Custom Hooks Pattern

Business logic được tách vào custom hooks:
- Quản lý state
- Xử lý side effects
- Tái sử dụng logic

**Ví dụ:**
```javascript
// features/books/hooks/useBooks.js
export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const loadBooks = useCallback(async () => {
    const data = await bookRepository.getAll();
    setBooks(data);
  }, []);
  // ...
  return { books, loadBooks, createBook, updateBook, deleteBook };
};
```

## Luồng dữ liệu

```
Page Component
    ↓
Custom Hook (Business Logic)
    ↓
Repository (Data Access)
    ↓
HTTP Client (API Call)
    ↓
Backend API
```

## Import/Export

### Import từ feature:
```javascript
// Import từ feature cụ thể
import { useBooks, BooksPage } from "../../features/books";

// Import từ central index
import { BooksPage, useBooks } from "../../features";
```

### Export trong feature:
```javascript
// features/books/index.js
export { default as BooksPage } from "./pages/BooksPage.jsx";
export { useBooks, useTopBooks } from "./hooks";
export { bookRepository } from "./api";
```

## Lợi ích

1. **Tổ chức rõ ràng**: Mỗi feature độc lập, dễ tìm và maintain
2. **Tái sử dụng**: Hooks và repositories có thể dùng lại
3. **Testability**: Dễ test từng layer riêng biệt
4. **Scalability**: Dễ thêm features mới
5. **Separation of Concerns**: Tách biệt rõ ràng giữa UI, business logic và data access

## Migration Notes

- Các pages cũ trong `modules/dashboard/pages/` vẫn tồn tại nhưng không được sử dụng
- Tất cả imports đã được cập nhật để sử dụng features mới
- Components được di chuyển vào features tương ứng
- Services API cũ vẫn tồn tại nhưng được wrap bởi repositories

