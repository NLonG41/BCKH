# 🌐 Hướng Dẫn Setup Google Translate API

## 📋 Tóm Tắt Nhanh

1. **Lấy API Key từ Google Cloud Console**
2. **Paste vào file `.env` ở thư mục gốc**
3. **Restart backend server**

---

## 🔑 Bước 1: Lấy API Key

### A. Truy cập Google Cloud Console
👉 **https://console.cloud.google.com/**

### B. Tạo Project (nếu chưa có)
1. Click dropdown project ở trên cùng
2. Click **"New Project"**
3. Đặt tên: `Library Translation`
4. Click **"Create"**

### C. Enable Cloud Translation API
1. Vào **"APIs & Services"** > **"Library"**
2. Tìm: **"Cloud Translation API"**
3. Click **"Enable"**

### D. Tạo API Key
1. Vào **"APIs & Services"** > **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** > **"API key"**
3. **Copy API key** (dạng: `AIzaSy...`)

### E. Giới hạn API Key (Khuyến nghị)
1. Click vào API key vừa tạo
2. **API restrictions**: Chọn **"Restrict key"** > Chọn **"Cloud Translation API"**
3. **Application restrictions**: Chọn **"HTTP referrers"** > Thêm `http://localhost:4000/*`
4. Click **"Save"**

---

## 📝 Bước 2: Paste API Key vào .env

1. Mở file `.env` ở **thư mục gốc** (cùng cấp với `package.json`)
2. Thêm dòng:
   ```env
   GOOGLE_TRANSLATE_API_KEY=AIzaSy... (paste API key của bạn vào đây)
   ```
3. **Lưu file**

---

## 🚀 Bước 3: Restart Backend

```bash
# Dừng server hiện tại (Ctrl+C)
# Sau đó chạy lại:
npm run dev
```

---

## ✅ Kiểm Tra

1. Mở website
2. Click chuyển sang **"English"**
3. Nếu thấy text được dịch tự động → **Thành công!** 🎉

---

## 💡 Lưu Ý

- **Free tier**: 500,000 ký tự/tháng miễn phí
- **Cache**: Translations được cache, không gọi API lại cho text đã dịch
- **Fallback**: Nếu API fail, sẽ hiển thị text tiếng Việt

---

## 🆘 Troubleshooting

### Lỗi: "Google Translate API key not configured"
- ✅ Kiểm tra file `.env` có đúng tên biến: `GOOGLE_TRANSLATE_API_KEY`
- ✅ Đảm bảo đã restart backend sau khi thêm API key

### Lỗi: "Translation failed"
- ✅ Kiểm tra API key có đúng không
- ✅ Kiểm tra Cloud Translation API đã được enable chưa
- ✅ Kiểm tra billing account (cần có billing account để dùng API)

### Text không được dịch
- ✅ Mở Console (F12) xem có lỗi gì không
- ✅ Kiểm tra network tab xem request `/api/translate` có thành công không

---

**Xem hướng dẫn chi tiết hơn trong file `GOOGLE_API_SETUP.md`**

