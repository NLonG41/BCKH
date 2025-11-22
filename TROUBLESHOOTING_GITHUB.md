# Hướng dẫn Khắc phục Lỗi Push lên GitHub

## 🔍 Các Nguyên nhân Không Push được lên GitHub

### 1. **Lỗi Encoding với Đường dẫn Tiếng Việt** ⚠️
- **Vấn đề**: PowerShell và Command Prompt có thể gặp lỗi encoding khi xử lý đường dẫn có ký tự tiếng Việt như "Báo cáo khoa học"
- **Giải pháp**: Sử dụng **Git Bash** thay vì PowerShell hoặc Command Prompt

### 2. **Chưa có Commit** 📝
- **Vấn đề**: Git yêu cầu ít nhất 1 commit trước khi push
- **Kiểm tra**: Chạy `git log` - nếu không có commit nào, bạn cần commit trước
- **Giải pháp**: 
  ```bash
  git add .
  git commit -m "Initial commit"
  ```

### 3. **Remote Repository chưa được cấu hình** 🔗
- **Vấn đề**: Git chưa biết push lên đâu
- **Kiểm tra**: Chạy `git remote -v`
- **Giải pháp**: 
  ```bash
  git remote add origin https://github.com/NLonG41/Qu-n-l-th-vi-n-.git
  ```

### 4. **Lỗi Xác thực (Authentication)** 🔐
- **Vấn đề**: GitHub không cho phép push vì chưa đăng nhập hoặc thiếu quyền
- **Các lỗi thường gặp**:
  - `fatal: Authentication failed`
  - `remote: Support for password authentication was removed`
  - `Permission denied (publickey)`

### 5. **Repository chưa tồn tại trên GitHub** 📦
- **Vấn đề**: Repository trên GitHub chưa được tạo
- **Giải pháp**: Tạo repository mới trên GitHub trước

### 6. **Branch không khớp** 🌿
- **Vấn đề**: Local branch (main/master) không khớp với remote
- **Giải pháp**: 
  ```bash
  git branch -M main  # Đổi tên branch thành main
  git push -u origin main
  ```

---

## ✅ Giải pháp Chi tiết

### **Cách 1: Sử dụng Git Bash (KHUYẾN NGHỊ)** ⭐

1. **Mở Git Bash** (không dùng PowerShell hay CMD)

2. **Chuyển đến thư mục dự án**:
   ```bash
   cd "/d/Báo cáo khoa học"
   # hoặc
   cd "D:/Báo cáo khoa học"
   ```

3. **Chạy script tự động**:
   ```bash
   bash push-to-github-gitbash.sh
   ```

4. **Hoặc làm thủ công**:
   ```bash
   # Kiểm tra git
   git status
   
   # Nếu chưa có .git, khởi tạo
   git init
   
   # Thêm remote (nếu chưa có)
   git remote add origin https://github.com/NLonG41/Qu-n-l-th-vi-n-.git
   
   # Kiểm tra remote
   git remote -v
   
   # Thêm files
   git add .
   
   # Commit
   git commit -m "Initial commit: Library management system"
   
   # Đặt branch main
   git branch -M main
   
   # Push
   git push -u origin main
   ```

### **Cách 2: Cấu hình Personal Access Token** 🔑

GitHub không còn hỗ trợ password authentication. Bạn cần dùng Personal Access Token:

1. **Tạo Token**:
   - Vào: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Đặt tên: "Library Management System"
   - Chọn quyền: `repo` (full control)
   - Click "Generate token"
   - **LƯU LẠI TOKEN NGAY** (chỉ hiện 1 lần)

2. **Sử dụng Token khi push**:
   ```bash
   git push -u origin main
   # Username: nhập username GitHub của bạn
   # Password: nhập Personal Access Token (KHÔNG phải password)
   ```

3. **Hoặc lưu credentials** (Windows):
   ```bash
   git config --global credential.helper wincred
   # Sau đó push lại, nhập token 1 lần, Windows sẽ lưu
   ```

### **Cách 3: Sử dụng SSH Key** 🔐

1. **Tạo SSH key** (nếu chưa có):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Nhấn Enter để chấp nhận đường dẫn mặc định
   # Nhập passphrase (hoặc để trống)
   ```

2. **Thêm SSH key vào GitHub**:
   ```bash
   # Copy public key
   cat ~/.ssh/id_ed25519.pub
   # Copy toàn bộ nội dung
   ```
   - Vào: https://github.com/settings/keys
   - Click "New SSH key"
   - Dán key vào, đặt tên, click "Add SSH key"

3. **Đổi remote sang SSH**:
   ```bash
   git remote set-url origin git@github.com:NLonG41/Qu-n-l-th-vi-n-.git
   git push -u origin main
   ```

### **Cách 4: Sử dụng GitHub Desktop** 🖥️

1. Tải và cài đặt [GitHub Desktop](https://desktop.github.com/)
2. Mở project trong GitHub Desktop
3. Click "Publish repository" hoặc "Push origin"

---

## 🔧 Kiểm tra và Debug

### Kiểm tra các bước:

```bash
# 1. Kiểm tra đang ở đúng thư mục
pwd
ls -la

# 2. Kiểm tra git đã khởi tạo chưa
git status

# 3. Kiểm tra remote
git remote -v

# 4. Kiểm tra branch
git branch

# 5. Kiểm tra commits
git log --oneline

# 6. Kiểm tra files đã add chưa
git status
```

### Các lỗi thường gặp và cách fix:

#### ❌ `fatal: not a git repository`
```bash
git init
```

#### ❌ `fatal: remote origin already exists`
```bash
# Xem remote hiện tại
git remote -v
# Xóa và thêm lại
git remote remove origin
git remote add origin https://github.com/NLonG41/Qu-n-l-th-vi-n-.git
```

#### ❌ `error: failed to push some refs`
```bash
# Pull trước khi push
git pull origin main --allow-unrelated-histories
# Sau đó push lại
git push -u origin main
```

#### ❌ `Permission denied (publickey)`
- Cấu hình SSH key (xem Cách 3 ở trên)
- Hoặc dùng Personal Access Token với HTTPS

#### ❌ `remote: Repository not found`
- Kiểm tra repository đã tồn tại trên GitHub chưa
- Kiểm tra URL remote: `git remote -v`
- Kiểm tra bạn có quyền truy cập repository không

---

## 📋 Checklist Trước khi Push

- [ ] Đã khởi tạo git repository (`git init`)
- [ ] Đã thêm remote repository (`git remote add origin <url>`)
- [ ] Đã add files (`git add .`)
- [ ] Đã commit (`git commit -m "message"`)
- [ ] Đã cấu hình authentication (Token hoặc SSH)
- [ ] Repository đã tồn tại trên GitHub
- [ ] Có quyền push vào repository

---

## 🆘 Vẫn Không Được?

1. **Kiểm tra kết nối mạng**
2. **Thử push với verbose để xem lỗi chi tiết**:
   ```bash
   git push -u origin main --verbose
   ```
3. **Kiểm tra GitHub Status**: https://www.githubstatus.com/
4. **Xem log lỗi chi tiết**:
   ```bash
   GIT_TRACE=1 GIT_CURL_VERBOSE=1 git push -u origin main
   ```

---

## 📞 Liên hệ

Nếu vẫn gặp vấn đề, hãy cung cấp:
- Thông báo lỗi đầy đủ
- Output của `git remote -v`
- Output của `git status`
- Output của `git log --oneline`

