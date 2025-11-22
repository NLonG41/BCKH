# Hướng dẫn Push Code lên GitHub - Thủ công

## Repository: https://github.com/NLonG41/BCKH

## Cách 1: Sử dụng Git Bash (KHUYẾN NGHỊ) ⭐

1. **Mở Git Bash** (không dùng PowerShell)

2. **Chuyển đến thư mục dự án**:
   ```bash
   cd "/d/Báo cáo khoa học"
   ```
   hoặc
   ```bash
   cd "D:/Báo cáo khoa học"
   ```

3. **Khởi tạo Git** (nếu chưa có):
   ```bash
   git init
   ```

4. **Xóa .git ở D:/ nếu có** (nếu git init tạo nhầm ở D:/):
   ```bash
   rm -rf "/d/.git"
   ```
   Sau đó chạy lại `git init`

5. **Thêm remote repository**:
   ```bash
   git remote add origin https://github.com/NLonG41/BCKH.git
   ```
   
   Nếu remote đã tồn tại, xóa và thêm lại:
   ```bash
   git remote remove origin
   git remote add origin https://github.com/NLonG41/BCKH.git
   ```

6. **Kiểm tra remote**:
   ```bash
   git remote -v
   ```

7. **Thêm tất cả files**:
   ```bash
   git add .
   ```

8. **Kiểm tra files đã add**:
   ```bash
   git status
   ```

9. **Commit**:
   ```bash
   git commit -m "Initial commit: Library management system"
   ```

10. **Đặt branch main**:
    ```bash
    git branch -M main
    ```

11. **Push lên GitHub**:
    ```bash
    git push -u origin main
    ```

12. **Khi được hỏi**:
    - **Username**: `NLonG41`
    - **Password**: Nhập **Personal Access Token** (KHÔNG phải password GitHub)
      - Tạo token tại: https://github.com/settings/tokens
      - Chọn quyền `repo` (full control)

---

## Cách 2: Sử dụng Command Prompt

1. **Mở Command Prompt** (cmd)

2. **Chuyển đến thư mục**:
   ```cmd
   cd /d "D:\Báo cáo khoa học"
   ```

3. **Chạy các lệnh tương tự như Git Bash** (bước 3-11 ở trên)

---

## Cách 3: Sử dụng Visual Studio Code

1. **Mở thư mục dự án trong VS Code**

2. **Mở Terminal tích hợp** (Ctrl + `)

3. **Chọn Git Bash** làm terminal mặc định (nếu có)

4. **Chạy các lệnh git** (bước 3-11 ở trên)

---

## Lưu ý Quan trọng

### Nếu git init tạo ở D:/ thay vì thư mục dự án:

1. **Xóa .git ở D:/**:
   ```bash
   rm -rf "/d/.git"
   ```

2. **Đảm bảo đang ở đúng thư mục**:
   ```bash
   pwd
   ls -la
   ```
   (Phải thấy các file như package.json, frontend/, src/, etc.)

3. **Chạy lại git init**

### Nếu gặp lỗi "dubious ownership":

Thêm safe.directory:
```bash
git config --global --add safe.directory "D:/Báo cáo khoa học"
```

### Nếu gặp lỗi authentication:

1. Tạo Personal Access Token:
   - Vào: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Đặt tên: "BCKH Repository"
   - Chọn quyền: **`repo`** (full control)
   - Click "Generate token"
   - **LƯU LẠI TOKEN** (chỉ hiện 1 lần)

2. Khi push, dùng token làm password

---

## Kiểm tra Sau khi Push

1. Vào: https://github.com/NLonG41/BCKH
2. Kiểm tra xem code đã được push lên chưa
3. Kiểm tra các file có đầy đủ không

---

## Các Lệnh Hữu Ích

```bash
# Xem trạng thái
git status

# Xem remote
git remote -v

# Xem branch
git branch

# Xem commits
git log --oneline

# Xem files đã được track
git ls-files
```

---

## Nếu Vẫn Gặp Vấn đề

1. Đảm bảo đang dùng **Git Bash** thay vì PowerShell
2. Kiểm tra đã tạo Personal Access Token chưa
3. Kiểm tra repository đã tồn tại trên GitHub: https://github.com/NLonG41/BCKH
4. Thử push lại với verbose để xem lỗi chi tiết:
   ```bash
   git push -u origin main --verbose
   ```

