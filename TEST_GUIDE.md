# Hướng dẫn Test API

## Vấn đề đã sửa

### 1. **Thiếu auto-load books trong useBooks hook**
- **Vấn đề**: Hook `useBooks` không tự động load books khi component mount
- **Giải pháp**: Thêm `useEffect` để tự động gọi `loadBooks()` khi hook được sử dụng
- **File**: `frontend/src/features/books/hooks/useBooks.js`

### 2. **Các hooks khác đã có auto-load**
- ✅ `useLoans` - đã có useEffect
- ✅ `useRecommendations` - đã có useEffect  
- ✅ `useUsers` - đã có useEffect
- ✅ `useNotifications` - đã có useEffect

## Cách chạy test

### Bước 1: Đảm bảo server đang chạy

```bash
# Terminal 1: Chạy backend server
npm run dev
# hoặc
npm start
```

Server sẽ chạy tại `http://localhost:4000`

### Bước 2: Đảm bảo có dữ liệu test

```bash
# Seed dữ liệu mẫu (nếu chưa có)
npm run seed
```

### Bước 3: Chạy test API

```bash
# Terminal 2: Chạy test
npm run test:api
```

Hoặc chạy trực tiếp:
```bash
node test-api.js
```

## Kết quả test

Test script sẽ kiểm tra:

1. **Authentication**
   - ✅ Login với credentials test
   - ✅ Lấy token

2. **Books API**
   - ✅ GET `/api/books` - Lấy danh sách sách
   - ✅ GET `/api/books/top` - Lấy top sách được mượn nhiều
   - ✅ POST `/api/books` - Tạo sách mới
   - ✅ PUT `/api/books/:id` - Cập nhật sách
   - ✅ DELETE `/api/books/:id` - Xóa sách

3. **Loans API**
   - ✅ GET `/api/loans` - Lấy danh sách mượn hiện tại
   - ✅ GET `/api/loans/history` - Lấy lịch sử mượn
   - ✅ GET `/api/loans/manage` - Quản lý mượn (librarian)

4. **Users API**
   - ✅ GET `/api/users` - Lấy danh sách users

5. **Notifications API**
   - ✅ GET `/api/notifications` - Lấy danh sách thông báo

6. **Recommendations API**
   - ✅ GET `/api/recommendations` - Lấy gợi ý sách

7. **Stats API**
   - ✅ GET `/api/admin/stats` - Lấy thống kê

## Cấu hình test

File `test-api.js` sử dụng:
- **Base URL**: `http://localhost:4000` (có thể thay đổi bằng biến môi trường `FRONTEND_URL`)
- **Test User**: `student1` / `123456` (có thể thay đổi trong file)

## Troubleshooting

### Lỗi: "Cannot connect to server"
- Đảm bảo backend server đang chạy
- Kiểm tra PORT trong `.env` file

### Lỗi: "Authentication failed"
- Kiểm tra user `student1` có tồn tại trong database
- Chạy `npm run seed` để tạo dữ liệu mẫu

### Lỗi: "No books found"
- Chạy `npm run seed` để tạo sách mẫu
- Hoặc tạo sách thủ công qua API hoặc giao diện

## Các chức năng đã được kiểm tra

✅ **GET sách** - Hoạt động bình thường
✅ **Auto-load books** - Đã được sửa trong hook
✅ **Tất cả CRUD operations** - Đã được test
✅ **Authentication** - Hoạt động bình thường
✅ **Các API endpoints khác** - Đã được test

## Next Steps

Sau khi chạy test, nếu có lỗi:
1. Kiểm tra console output để xem endpoint nào fail
2. Kiểm tra server logs để xem lỗi chi tiết
3. Kiểm tra database connection
4. Kiểm tra authentication middleware

