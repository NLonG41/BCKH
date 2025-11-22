# Sửa Lỗi "remote origin already exists"

## Vấn đề
Bạn gặp lỗi: `error: remote origin already exists`

## Giải pháp

### Bước 1: Mở Git Bash (KHÔNG dùng PowerShell)

### Bước 2: Chuyển đến thư mục dự án
```bash
cd "/d/Báo cáo khoa học"
```

### Bước 3: Xóa .git ở D:/ (nếu có)
```bash
rm -rf "/d/.git"
```

### Bước 4: Kiểm tra xem đã có .git trong thư mục dự án chưa
```bash
ls -la | grep .git
```

### Bước 5: Khởi tạo git trong thư mục đúng (nếu chưa có)
```bash
git init
```

### Bước 6: Kiểm tra remote hiện tại
```bash
git remote -v
```

### Bước 7: Xóa remote cũ (nếu cần)
```bash
git remote remove origin
```

### Bước 8: Thêm remote mới
```bash
git remote add origin https://github.com/NLonG41/BCKH.git
```

### Bước 9: Hoặc cập nhật URL remote (nếu remote đã tồn tại)
```bash
git remote set-url origin https://github.com/NLonG41/BCKH.git
```

### Bước 10: Kiểm tra lại
```bash
git remote -v
```
Phải hiển thị:
```
origin  https://github.com/NLonG41/BCKH.git (fetch)
origin  https://github.com/NLonG41/BCKH.git (push)
```

### Bước 11: Tiếp tục push
```bash
git add .
git commit -m "Initial commit: Library management system"
git branch -M main
git push -u origin main
```

---

## Lưu ý

- **LUÔN dùng Git Bash** thay vì PowerShell để tránh lỗi encoding
- Đảm bảo đang ở đúng thư mục dự án (phải thấy package.json, frontend/, src/)
- Nếu vẫn lỗi, thử xóa toàn bộ .git và khởi tạo lại:
  ```bash
  rm -rf .git
  git init
  git remote add origin https://github.com/NLonG41/BCKH.git
  ```

