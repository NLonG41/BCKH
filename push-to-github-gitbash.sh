#!/bin/bash
# Script để push code lên GitHub sử dụng Git Bash

# Chuyển đến thư mục dự án
cd "/d/Báo cáo khoa học" || cd "D:/Báo cáo khoa học"

echo "=== Kiểm tra Git Repository ==="
# Kiểm tra xem đã có git repository chưa
if [ ! -d ".git" ]; then
    echo "Khởi tạo git repository..."
    git init
fi

echo ""
echo "=== Kiểm tra Remote Repository ==="
# Kiểm tra remote
if ! git remote | grep -q "origin"; then
    echo "Thêm remote repository..."
    git remote add origin "https://github.com/NLonG41/Qu-n-l-th-vi-n-.git"
else
    echo "Remote repository đã tồn tại:"
    git remote -v
fi

echo ""
echo "=== Kiểm tra Branch ==="
# Kiểm tra và đặt branch
current_branch=$(git branch --show-current 2>/dev/null || echo "")
if [ -z "$current_branch" ]; then
    echo "Tạo branch main..."
    git checkout -b main 2>/dev/null || git branch -M main
    current_branch="main"
else
    echo "Branch hiện tại: $current_branch"
fi

echo ""
echo "=== Thêm files ==="
git add .

echo ""
echo "=== Kiểm tra thay đổi ==="
if [ -n "$(git status --porcelain)" ]; then
    echo "Có thay đổi để commit"
    echo ""
    echo "=== Commit changes ==="
    git commit -m "Initial commit: Library management system"
    
    echo ""
    echo "=== Push lên GitHub ==="
    echo "Đang push lên origin/$current_branch..."
    git push -u origin "$current_branch"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Push thành công!"
    else
        echo ""
        echo "❌ Push thất bại. Có thể do:"
        echo "   1. Chưa đăng nhập GitHub"
        echo "   2. Repository chưa tồn tại trên GitHub"
        echo "   3. Không có quyền push vào repository"
        echo "   4. Cần cấu hình Personal Access Token"
        echo ""
        echo "Giải pháp:"
        echo "   - Tạo Personal Access Token tại: https://github.com/settings/tokens"
        echo "   - Sử dụng token làm password khi push"
        echo "   - Hoặc cấu hình SSH key"
    fi
else
    echo "Không có thay đổi để commit"
fi

echo ""
echo "Hoàn thành!"

