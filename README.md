# 📚 Hệ Thống Quản Lý Thư Viện Số USTH

Hệ thống quản lý thư viện số hoàn chỉnh với đầy đủ chức năng mượn trả sách, quản lý người dùng, thông báo và gợi ý sách.

## 📋 Mục Lục

- [Tổng Quan](#tổng-quan)
- [Kiến Trúc Hệ Thống](#kiến-trúc-hệ-thống)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
- [Cài Đặt và Chạy](#cài-đặt-và-chạy)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Chức Năng Từng Screen](#chức-năng-từng-screen)
- [Authentication & Authorization](#authentication--authorization)
- [Internationalization (i18n)](#internationalization-i18n)

---

## 🎯 Tổng Quan

Hệ thống quản lý thư viện số USTH là một ứng dụng web full-stack cho phép:
- **Sinh viên**: Đăng ký tài khoản, xem danh sách sách, mượn sách, xem lịch sử mượn, nhận thông báo
- **Thủ thư/Trợ lý**: Quản lý sách, quản lý mượn trả, quản lý sinh viên, gửi thông báo
- **Admin**: Toàn quyền quản lý hệ thống

---

## 🏗️ Kiến Trúc Hệ Thống

### Mô Hình Kiến Trúc

```
┌─────────────────┐
│   Frontend       │
│   (React + Vite) │
└────────┬────────┘
         │ HTTP/REST API
         │
┌────────▼────────┐
│   Backend       │
│   (Node.js +    │
│    Express)     │
└────────┬────────┘
         │
┌────────▼────────┐
│   Database      │
│   (MongoDB)     │
└─────────────────┘
```

### Kiến Trúc Frontend

- **Feature Slice Pattern**: Mỗi nghiệp vụ (books, loans, users, notifications, stats, home, recommendations) được tổ chức thành một feature riêng trong thư mục `features/`.
- **Repository Pattern**: Tầng `api/` trong từng feature chịu trách nhiệm truy cập dữ liệu (HTTP calls), tách biệt khỏi UI và business logic.
- **Custom Hooks**: Business logic được gom trong `hooks/` (ví dụ: `useBooks`, `useLoans`, `useUsers`, `useNotifications`, `useStats`), giúp tái sử dụng và dễ test.
- **Modules**: `modules/auth` và `modules/dashboard` chỉ còn đóng vai trò layout/container, sử dụng lại các feature bên trong.
- **Context API**: Quản lý state toàn cục (Auth, i18n, Sidebar).
- **React Router**: Điều hướng và bảo vệ routes.

> Chi tiết kiến trúc frontend xem thêm trong `frontend/ARCHITECTURE.md`.

### Kiến Trúc Backend

- **MVC Pattern**: 
  - **Models**: Mongoose schemas
  - **Controllers**: Business logic
  - **Routes**: API endpoints
- **Middleware**: Authentication, authorization, error handling
- **Scheduled Tasks**: Tự động kiểm tra sách quá hạn

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1**: UI framework
- **Vite 5.4.10**: Build tool và dev server
- **React Router DOM 6.28.0**: Client-side routing
- **Tailwind CSS 3.4.15**: Utility-first CSS framework
- **Axios 1.7.7**: HTTP client
- **Day.js 1.11.11**: Date manipulation

### Backend
- **Node.js**: Runtime environment
- **Express 4.19.2**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose 8.7.0**: ODM (Object Document Mapper)
- **JWT (jsonwebtoken 9.0.2)**: Authentication tokens
- **Bcryptjs 2.4.3**: Password hashing
- **Day.js 1.11.11**: Date utilities

### Development Tools
- **Nodemon 3.1.7**: Auto-restart server
- **Prettier 3.3.2**: Code formatter

---

## 📦 Dependencies

### Backend Dependencies

```json
{
  "bcryptjs": "^2.4.3",          // Password hashing
  "cookie-parser": "^1.4.7",     // Cookie parsing
  "cors": "^2.8.5",              // Cross-origin resource sharing
  "dayjs": "^1.11.11",           // Date manipulation
  "dotenv": "^16.4.5",           // Environment variables
  "express": "^4.19.2",          // Web framework
  "jsonwebtoken": "^9.0.2",      // JWT authentication
  "mongoose": "^8.7.0",          // MongoDB ODM
  "morgan": "^1.10.0",           // HTTP request logger
  "nanoid": "^5.0.7"             // Unique ID generation
}
```

### Frontend Dependencies

```json
{
  "axios": "^1.7.7",             // HTTP client
  "dayjs": "^1.11.11",           // Date manipulation
  "react": "^18.3.1",            // UI library
  "react-dom": "^18.3.1",        // React DOM renderer
  "react-router-dom": "^6.28.0" // Routing
}
```

### Frontend Dev Dependencies

```json
{
  "@vitejs/plugin-react": "^4.3.2",  // Vite React plugin
  "autoprefixer": "^10.4.20",        // CSS autoprefixer
  "postcss": "^8.4.49",              // CSS processor
  "tailwindcss": "^3.4.15",          // CSS framework
  "vite": "^5.4.10"                  // Build tool
}
```

---

## 📁 Cấu Trúc Thư Mục

```
library-portal/
├── frontend/                      # Frontend React application
│   ├── public/                    # Static assets
│   │   └── book-logo.svg
│   ├── src/
│   │   ├── components/             # Global reusable components
│   │   │   └── LanguageSwitcher.jsx
│   │   ├── contexts/               # React contexts
│   │   │   └── I18nContext.jsx
│   │   ├── features/               # Feature Slice Pattern
│   │   │   ├── books/              # Quản lý sách (api, hooks, components, pages)
│   │   │   ├── loans/              # Quản lý mượn trả
│   │   │   ├── users/              # Quản lý người dùng
│   │   │   ├── notifications/      # Thông báo
│   │   │   ├── stats/              # Thống kê
│   │   │   ├── recommendations/    # Gợi ý sách
│   │   │   └── home/               # Trang home cho sinh viên & thủ thư
│   │   ├── modules/
│   │   │   ├── auth/               # Authentication layout + logic
│   │   │   │   ├── AuthContext.jsx
│   │   │   │   └── Login.jsx
│   │   │   └── dashboard/          # Dashboard layouts (student / librarian)
│   │   │       ├── components/
│   │   │       │   ├── Sidebar.jsx
│   │   │       │   └── SidebarContext.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── LibrarianDashboard.jsx
│   │   │       └── StudentDashboard.jsx
│   │   ├── services/               # HTTP client
│   │   │   └── http.js
│   │   ├── utils/                  # Utility functions
│   │   │   └── i18n.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── postcss.config.js
│
├── src/                            # Backend Node.js application
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/                # Business logic
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── loanController.js
│   │   ├── notificationController.js
│   │   ├── recommendationController.js
│   │   ├── statsController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── models/                     # Mongoose schemas
│   │   ├── Book.js
│   │   ├── Loan.js
│   │   ├── Notification.js
│   │   └── User.js
│   ├── routes/                     # API routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── loanRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── recommendationRoutes.js
│   │   └── userRoutes.js
│   ├── utils/                     # Utility functions
│   │   ├── date.js
│   │   └── jwt.js
│   ├── seed.js                     # Database seeding script
│   └── server.js                   # Express server entry point
│
├── scripts/                        # Utility scripts
│   ├── clearData.js                # Clear loans and notifications
│   └── deleteUsers.js              # Delete specific users
│
├── package.json
└── README.md
```

---

## 🚀 Cài Đặt và Chạy

### Yêu Cầu Hệ Thống

- **Node.js**: >= 18.x
- **MongoDB**: >= 6.x
- **npm**: >= 9.x

### Bước 1: Clone Repository

```bash
git clone <repository-url>
cd library-portal
```

### Bước 2: Cài Đặt Backend Dependencies

```bash
npm install
```

### Bước 3: Cài Đặt Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### Bước 4: Cấu Hình Environment Variables

Tạo file `.env` ở thư mục gốc:

```env
# MongoDB Connection
MONGO_URI=mongodb://127.0.0.1:27017/library

# Server Port
PORT=4000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=your-secret-key-here
```

### Bước 5: Khởi Động MongoDB

**Windows:**
```bash
# MongoDB service thường tự động chạy
# Hoặc khởi động thủ công:
net start MongoDB
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
# hoặc
brew services start mongodb-community
```

### Bước 6: Seed Database

```bash
npm run seed
```

Script seed hiện chỉ đảm bảo:
- **Admin**: `admin` / `admin`
- **Assistant**: `assistant` / `123456`
- **Danh mục sách mẫu** (không tạo phiếu mượn demo, không tạo user sinh viên mặc định)

> Việc này giúp dữ liệu người dùng thật (được tạo bởi admin/assistant) luôn được giữ nguyên khi redeploy.

### Bước 7: Chạy Backend Server

```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:4000`

### Bước 8: Chạy Frontend Development Server

Mở terminal mới:

```bash
cd frontend
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

### Scripts Khác

```bash
# Chạy production server
npm start

# Xóa toàn bộ loans + notifications và cộng lại số lượng sách
npm run clear:data

# (Tùy chọn) Dọn các user demo cũ (sinhvien_a, sinhvien_b) nếu còn tồn tại trong DB cũ
npm run delete:users

# Chạy toàn bộ test API backend
npm run test:api
```

Chi tiết thêm về test API xem trong file `TEST_GUIDE.md`.

---

## 🗄️ Database Schema

### User Model

```javascript
{
  username: String (unique, required),
  fullName: String (required),
  email: String (unique, required, lowercase),
  passwordHash: String (required),
  role: String (enum: ["user", "assistant", "admin"], default: "user"),
  isActive: Boolean (default: true),
  lastLoginAt: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Book Model

```javascript
{
  title: String (required),
  author: String,
  category: String (required, indexed),
  description: String,
  coverUrl: String,
  quantity: Number (default: 1, min: 0),
  borrowedCount: Number (default: 0),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Loan Model

```javascript
{
  user: ObjectId (ref: User, required),
  book: ObjectId (ref: Book, required),
  borrowDate: Date (default: Date.now),
  dueDate: Date (required),
  returnDate: Date,
  status: String (enum: ["borrowed", "returned", "overdue"], default: "borrowed"),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Notification Model

```javascript
{
  user: ObjectId (ref: User, required),
  message: String (required),
  isRead: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Đăng ký tài khoản mới | No |
| POST | `/api/auth/login` | Đăng nhập | No |

### Books

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/books` | Lấy danh sách sách | Yes | All |
| GET | `/api/books/top?limit=5` | Top sách mượn nhiều | Yes | All |
| POST | `/api/books` | Thêm sách mới | Yes | admin, assistant |
| PUT | `/api/books/:id` | Cập nhật sách | Yes | admin, assistant |
| DELETE | `/api/books/:id` | Xóa sách | Yes | admin, assistant |

### Loans

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/loans` | Sách đang mượn của user | Yes | user |
| GET | `/api/loans/history` | Lịch sử mượn của user | Yes | user |
| GET | `/api/loans/manage` | Danh sách tất cả phiếu mượn | Yes | admin, assistant |
| POST | `/api/loans` | Mượn sách | Yes | user |
| POST | `/api/loans/:id/confirm` | Xác nhận trả sách | Yes | admin, assistant |
| POST | `/api/loans/overdue/scan` | Quét và đánh dấu quá hạn | Yes | admin, assistant |

### Recommendations

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/recommendations` | Gợi ý sách cho user | Yes |

### Notifications

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/notifications` | Lấy thông báo của user | Yes | All |
| POST | `/api/notifications/:id/read` | Đánh dấu đã đọc | Yes | All |
| POST | `/api/notifications` | Gửi thông báo thủ công | Yes | admin, assistant |

### Users

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/users` | Danh sách sinh viên | Yes | admin, assistant |
| POST | `/api/users/:id/toggle-active` | Khóa/Mở khóa tài khoản | Yes | admin, assistant |
| POST | `/api/users/:id/reset-password` | Đặt lại mật khẩu | Yes | admin, assistant |
| DELETE | `/api/users/:id` | Xóa tài khoản | Yes | admin, assistant |

### Admin

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/admin/stats` | Thống kê tổng quan | Yes | admin, assistant |

---

## 📱 Chức Năng Từng Screen

### 🔐 Authentication Screen

**File**: `frontend/src/modules/auth/Login.jsx`

**Chức năng:**
- Đăng nhập với username/password
- Đăng ký tài khoản mới (sinh viên)
- Chuyển đổi giữa chế độ đăng nhập và đăng ký
- Chuyển đổi ngôn ngữ (Việt/Anh)
- Validation form
- Hiển thị lỗi đăng nhập/đăng ký

**Components sử dụng:**
- `LanguageSwitcher`: Chuyển đổi ngôn ngữ

---

### 🏠 Student Dashboard - HomePage

**File**: `frontend/src/modules/dashboard/pages/HomePage.jsx`

**Chức năng:**
- Hiển thị lời chào
- Hiển thị "Top sách được mượn nhiều nhất" (Top 5)
- Mỗi sách hiển thị: ảnh bìa, tên, tác giả, thể loại, số lượt mượn
- Nút "Xem mô tả" để xem chi tiết sách

**Components sử dụng:**
- `TopBorrowed`: Component hiển thị top sách
- `BookDescriptionModal`: Modal xem mô tả sách

---

### 📚 Student Dashboard - BooksPage

**File**: `frontend/src/modules/dashboard/pages/BooksPage.jsx`

**Chức năng:**
- Hiển thị danh mục sách với bộ lọc theo thể loại
- Mỗi sách hiển thị: ảnh bìa, tên, tác giả, thể loại, số lượng còn lại
- Nút "Mượn" để đăng ký mượn sách
- Nút "Xem mô tả" để xem chi tiết
- Hiển thị phần "Gợi ý dành cho bạn" dựa trên lịch sử mượn

**Components sử dụng:**
- `BookCatalog`: Component danh mục sách
- `RecommendationList`: Component gợi ý sách
- `BookDescriptionModal`: Modal xem mô tả

---

### 📖 Student Dashboard - MyLoansPage

**File**: `frontend/src/modules/dashboard/pages/MyLoansPage.jsx`

**Chức năng:**
- Hiển thị danh sách sách đang mượn
- Mỗi sách hiển thị: ảnh bìa, tên, hạn trả
- Đánh dấu màu đỏ nếu quá hạn
- Hiển thị trạng thái: "Đang mượn" hoặc "Quá hạn"
- Nút "Xem mô tả" cho mỗi sách

**Components sử dụng:**
- `BorrowedList`: Component danh sách sách đang mượn
- `BookDescriptionModal`: Modal xem mô tả

---

### 📋 Student Dashboard - HistoryPage

**File**: `frontend/src/modules/dashboard/pages/HistoryPage.jsx`

**Chức năng:**
- Hiển thị lịch sử mượn sách (tối đa 5 mục gần nhất)
- Mỗi mục hiển thị: ảnh bìa, tên sách, ngày mượn, hạn trả
- Trạng thái: "Đã trả", "Đang mượn", "Quá hạn"
- Nút "Xem mô tả" cho mỗi sách

**Components sử dụng:**
- `LoanHistory`: Component lịch sử mượn
- `BookDescriptionModal`: Modal xem mô tả

---

### 🏛️ Librarian Dashboard - LibrarianHomePage

**File**: `frontend/src/modules/dashboard/pages/LibrarianHomePage.jsx`

**Chức năng:**
- Hiển thị lời chào
- Hiển thị hướng dẫn sử dụng hệ thống
- Liệt kê các chức năng chính: Quản lý mượn trả, Quản lý sách, Quản lý sinh viên, Thông báo

---

### 📚 Librarian Dashboard - LoansManagementPage

**File**: `frontend/src/modules/dashboard/pages/LoansManagementPage.jsx`

**Chức năng:**
- Hiển thị bảng danh sách tất cả phiếu mượn đang hoạt động
- Cột: Tên SV, Tên sách, Ngày mượn, Hạn trả, Trạng thái
- Đánh dấu màu đỏ các dòng quá hạn
- Nút "Xác nhận trả sách" cho mỗi phiếu mượn
- Nút "Quét quá hạn" để tự động đánh dấu và gửi thông báo

**Components sử dụng:**
- `LibrarianLoanTable`: Component bảng quản lý mượn trả

---

### 📖 Librarian Dashboard - BooksManagementPage

**File**: `frontend/src/modules/dashboard/pages/BooksManagementPage.jsx`

**Chức năng:**
- Form thêm/sửa sách với các trường:
  - Tên sách, Tác giả, Thể loại, Số lượng
  - Mô tả sách (textarea)
  - Ảnh bìa sách (upload file hoặc nhập URL)
- Danh sách tất cả sách với nút "Sửa" và "Xóa"
- Hiển thị thông tin: ảnh bìa, tên, tác giả, thể loại, số lượng, mô tả

**Components sử dụng:**
- `BookManager`: Component quản lý sách
- `ImageUpload`: Component upload ảnh

---

### 👥 Librarian Dashboard - UsersManagementPage

**File**: `frontend/src/modules/dashboard/pages/UsersManagementPage.jsx`

**Chức năng:**
- Danh sách tất cả sinh viên
- Mỗi sinh viên hiển thị: Họ tên, Email, Trạng thái (Đang hoạt động/Đã khóa)
- Các nút hành động:
  - "Đặt lại mật khẩu": Đặt lại mật khẩu (mặc định: 123456)
  - "Khóa"/"Mở khóa": Thay đổi trạng thái tài khoản
  - "Xóa": Xóa vĩnh viễn tài khoản (cùng với loans và notifications)

**Components sử dụng:**
- `UserManager`: Component quản lý sinh viên

---

### 🔔 Librarian Dashboard - NotificationsPage

**File**: `frontend/src/modules/dashboard/pages/NotificationsPage.jsx`

**Chức năng:**
- Form gửi thông báo thủ công
- Dropdown chọn sinh viên
- Textarea nhập nội dung thông báo
- Nút "Gửi" để gửi thông báo

**Components sử dụng:**
- `ManualNotification`: Component gửi thông báo

---

### 🎨 Shared Components

#### Sidebar
**File**: `frontend/src/modules/dashboard/components/Sidebar.jsx`

**Chức năng:**
- Menu điều hướng với các mục khác nhau cho Student và Librarian
- Có thể thu gọn/mở rộng (collapsible)
- Responsive: overlay trên mobile, sidebar cố định trên desktop
- Highlight menu item đang active

#### NotificationBell
**File**: `frontend/src/modules/dashboard/components/NotificationBell.jsx`

**Chức năng:**
- Hiển thị số lượng thông báo chưa đọc
- Dropdown danh sách thông báo
- Đánh dấu đã đọc khi click
- Hiển thị thời gian tạo thông báo

#### BookDescriptionModal
**File**: `frontend/src/modules/dashboard/components/BookDescriptionModal.jsx`

**Chức năng:**
- Modal hiển thị chi tiết sách
- Hiển thị: ảnh bìa, tên, tác giả, thể loại, mô tả, số lượt mượn, số lượng còn lại
- Nút đóng modal (X hoặc click outside)

#### LanguageSwitcher
**File**: `frontend/src/components/LanguageSwitcher.jsx`

**Chức năng:**
- Dropdown chọn ngôn ngữ (Tiếng Việt / English)
- Lưu lựa chọn vào localStorage
- Áp dụng ngay lập tức cho toàn bộ ứng dụng

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. User đăng nhập/đăng ký qua `/api/auth/login` hoặc `/api/auth/register`
2. Server trả về JWT token
3. Frontend lưu token vào localStorage
4. Mỗi request API đính kèm token trong header: `Authorization: Bearer <token>`
5. Middleware `authenticate` verify token và gắn user vào `req.user`

### Authorization (Role-Based Access Control)

**Roles:**
- `user`: Sinh viên - chỉ được mượn sách và xem thông tin cá nhân
- `assistant`: Trợ lý thư viện - quản lý sách, mượn trả, sinh viên, thông báo
- `admin`: Quản trị viên - toàn quyền

**Middleware:**
- `authenticate`: Verify JWT token
- `allowRoles(...roles)`: Kiểm tra role của user

**Ví dụ:**
```javascript
router.post("/books", authenticate, allowRoles("admin", "assistant"), createBook);
```

---

## 🌐 Internationalization (i18n)

### Cấu Trúc

- **Translation File**: `frontend/src/utils/i18n.js`
- **Context**: `frontend/src/contexts/I18nContext.jsx`
- **Component**: `frontend/src/components/LanguageSwitcher.jsx`

### Cách Sử Dụng

```javascript
import { useI18n } from "../contexts/I18nContext.jsx";

const MyComponent = () => {
  const { t } = useI18n();
  
  return <h1>{t("welcome")}</h1>;
};
```

### Ngôn Ngữ Hỗ Trợ

- **Tiếng Việt (vi)**: Ngôn ngữ mặc định
- **English (en)**: Ngôn ngữ thứ hai

### Lưu Trữ

Lựa chọn ngôn ngữ được lưu trong `localStorage` với key `library:language`.

---

## 📝 Notes

### Scheduled Tasks

Backend tự động chạy task kiểm tra sách quá hạn mỗi giờ:
```javascript
setInterval(markOverduesAndNotify, 60 * 60 * 1000);
```

### Default Accounts

Sau khi chạy `npm run seed` (hoặc deploy lần đầu):
- **Admin**: `admin` / `admin`
- **Assistant**: `assistant` / `123456`

Các tài khoản sinh viên sẽ do admin/assistant tạo thủ công trong hệ thống, vì vậy dữ liệu thực tế của bạn sẽ không bị ghi đè khi seed lại.

### Image Upload

Hệ thống hỗ trợ 2 cách upload ảnh bìa sách:
1. **Nhập URL**: Dán link ảnh từ internet
2. **Upload File**: Chọn file từ máy (PNG, JPG, JPEG, tối đa 5MB) - chuyển thành Base64

---

## 👥 Contributors

- USTH Library Management Team

---

## 📄 License

This project is for educational purposes.

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Lỗi**: `connect ECONNREFUSED 127.0.0.1:27017`

**Giải pháp**:
1. Kiểm tra MongoDB service đã chạy chưa
2. Windows: `net start MongoDB`
3. Linux: `sudo systemctl start mongod`

### Port Already in Use

**Lỗi**: `EADDRINUSE: address already in use`

**Giải pháp**:
1. Thay đổi PORT trong `.env`
2. Hoặc kill process đang dùng port: `npx kill-port 4000`

### Module Not Found

**Lỗi**: `Cannot find module 'xxx'`

**Giải pháp**:
1. Xóa `node_modules` và `package-lock.json`
2. Chạy lại `npm install`

---

**Last Updated**: 2024

