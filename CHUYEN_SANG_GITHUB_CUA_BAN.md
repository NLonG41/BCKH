# Hướng dẫn Chuyển sang GitHub của Bạn

## 🎯 Vấn đề
Bạn đang bị từ chối (denied) khi push vào repository của người khác (tanyb123) và muốn chuyển sang repository GitHub của chính bạn.

## ✅ Giải pháp Nhanh

### **Cách 1: Sử dụng Git Bash (KHUYẾN NGHỊ)** ⭐

1. **Mở Git Bash**

2. **Chạy script tự động**:
   ```bash
   cd "D:/Báo cáo khoa học"
   bash setup-my-github.sh
   ```

3. **Nhập thông tin khi được hỏi**:
   - Username GitHub của bạn (ví dụ: `your-username`)
   - Tên repository (hoặc Enter để dùng `library-management`)

4. **Tạo repository trên GitHub**:
   - Vào: https://github.com/new
   - Repository name: (tên bạn đã nhập)
   - Chọn Public hoặc Private
   - **KHÔNG** tích "Initialize with README"
   - Click "Create repository"

5. **Push code**:
   - Script sẽ tự động push, hoặc bạn chạy:
   ```bash
   git push -u origin main
   ```
   - Username: nhập username GitHub của bạn
   - Password: nhập **Personal Access Token** (không phải password)

### **Cách 2: Sử dụng PowerShell**

1. **Mở PowerShell**

2. **Chạy script**:
   ```powershell
   cd "D:\Báo cáo khoa học"
   .\setup-my-github.ps1
   ```

3. **Làm theo các bước tương tự như Cách 1**

### **Cách 3: Làm Thủ công**

1. **Khởi tạo git** (nếu chưa có):
   ```bash
   git init
   ```

2. **Xóa remote cũ** (nếu có):
   ```bash
   git remote remove origin
   ```

3. **Thêm remote mới** (thay `YOUR_USERNAME` và `REPO_NAME`):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   ```

4. **Kiểm tra remote**:
   ```bash
   git remote -v
   ```

5. **Thêm và commit**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   ```

6. **Tạo repository trên GitHub** (xem bước 4 ở Cách 1)

7. **Push**:
   ```bash
   git push -u origin main
   ```

## 🔑 Tạo Personal Access Token

Nếu chưa có token:

1. Vào: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Đặt tên: "Library Management System"
4. Chọn quyền: **`repo`** (full control)
5. Click "Generate token"
6. **LƯU LẠI TOKEN** (chỉ hiện 1 lần)

Khi push, dùng token này làm password.

## 📝 Lưu ý

- ✅ Đảm bảo repository đã được tạo trên GitHub trước khi push
- ✅ Sử dụng Personal Access Token, không dùng password GitHub
- ✅ Nếu dùng Git Bash, không gặp lỗi encoding với đường dẫn tiếng Việt

## 🆘 Vẫn Gặp Lỗi?

Kiểm tra:
```bash
# Xem remote hiện tại
git remote -v

# Xem branch
git branch

# Xem commits
git log --oneline
```

Nếu vẫn lỗi, xem file `TROUBLESHOOTING_GITHUB.md` để biết thêm chi tiết.

