# 🔑 Hướng Dẫn Lấy Google Translate API Key

## Bước 1: Truy cập Google Cloud Console

1. Mở trình duyệt và vào: **https://console.cloud.google.com/**
2. Đăng nhập bằng tài khoản Google của bạn

## Bước 2: Tạo Project (nếu chưa có)

1. Click vào dropdown project ở thanh trên cùng
2. Click **"New Project"**
3. Đặt tên project (ví dụ: "Library Translation")
4. Click **"Create"**

## Bước 3: Enable Google Translate API

1. Vào **"APIs & Services"** > **"Library"** (hoặc tìm kiếm "API Library")
2. Tìm kiếm: **"Cloud Translation API"**
3. Click vào **"Cloud Translation API"**
4. Click nút **"Enable"** (Bật API)

## Bước 4: Tạo API Key

1. Vào **"APIs & Services"** > **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** ở trên cùng
3. Chọn **"API key"**
4. Copy API key vừa tạo (sẽ hiện dạng: `AIzaSy...`)

## Bước 5: Giới hạn API Key (Khuyến nghị - Bảo mật)

1. Click vào API key vừa tạo để chỉnh sửa
2. Trong phần **"API restrictions"**:
   - Chọn **"Restrict key"**
   - Chọn **"Cloud Translation API"** trong danh sách
3. Trong phần **"Application restrictions"**:
   - Chọn **"HTTP referrers (web sites)"**
   - Thêm: `http://localhost:5173/*` (cho development)
   - Thêm domain production của bạn (nếu có)
4. Click **"Save"**

## Bước 6: Lưu API Key vào file .env (Backend)

1. Tạo hoặc mở file `.env` trong **thư mục gốc** của project (cùng cấp với `package.json`)
2. Thêm dòng:
   ```
   GOOGLE_TRANSLATE_API_KEY=YOUR_API_KEY_HERE
   ```
3. Thay `YOUR_API_KEY_HERE` bằng API key bạn vừa copy
4. **Lưu ý:** API key được lưu ở backend để bảo mật, không expose ra frontend

## Lưu ý:

- ✅ **API Key được lưu ở backend**, an toàn hơn so với lưu ở frontend
- 💰 Google Translate API có free tier: **500,000 ký tự/tháng miễn phí**
- 🔒 Sau khi giới hạn API key, chỉ domain được phép mới có thể sử dụng
- 📝 Nếu cần, có thể tạo nhiều API key cho dev/prod riêng biệt
- 🚀 Sau khi thêm API key, **restart backend server** để áp dụng thay đổi

## Kiểm tra API Key:

Sau khi setup xong, refresh trang web và chuyển sang tiếng Anh. Nếu thấy text được dịch tự động thì đã thành công!

