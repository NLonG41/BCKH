#!/bin/bash
# Script để cấu hình Git với repository GitHub của bạn

echo "=== Cấu hình Git Repository cho GitHub của bạn ==="
echo ""

# Chuyển đến thư mục dự án
cd "/d/Báo cáo khoa học" 2>/dev/null || cd "D:/Báo cáo khoa học" 2>/dev/null || {
    echo "❌ Không tìm thấy thư mục dự án"
    exit 1
}

echo "📁 Thư mục hiện tại: $(pwd)"
echo ""

# Nhập username GitHub
read -p "Nhập username GitHub của bạn: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Username không được để trống!"
    exit 1
fi

# Nhập tên repository (hoặc dùng tên mặc định)
read -p "Nhập tên repository (hoặc Enter để dùng 'library-management'): " REPO_NAME
REPO_NAME=${REPO_NAME:-library-management}

echo ""
echo "=== Khởi tạo Git Repository ==="
# Khởi tạo git nếu chưa có
if [ ! -d ".git" ]; then
    echo "Đang khởi tạo git repository..."
    git init
else
    echo "Git repository đã tồn tại"
fi

echo ""
echo "=== Cấu hình Remote Repository ==="
# Xóa remote cũ nếu có
if git remote | grep -q "origin"; then
    echo "Đang xóa remote cũ..."
    git remote remove origin
fi

# Thêm remote mới
REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
echo "Đang thêm remote: $REPO_URL"
git remote add origin "$REPO_URL"

echo ""
echo "✅ Remote đã được cấu hình:"
git remote -v

echo ""
echo "=== Cấu hình Branch ==="
# Đặt branch main
current_branch=$(git branch --show-current 2>/dev/null || echo "")
if [ -z "$current_branch" ]; then
    echo "Tạo branch main..."
    git checkout -b main 2>/dev/null || git branch -M main
else
    echo "Branch hiện tại: $current_branch"
    if [ "$current_branch" != "main" ]; then
        echo "Đổi tên branch thành main..."
        git branch -M main
    fi
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
    echo "=== Hướng dẫn Push lên GitHub ==="
    echo ""
    echo "⚠️  QUAN TRỌNG: Trước khi push, bạn cần:"
    echo ""
    echo "1. Tạo repository trên GitHub:"
    echo "   - Vào: https://github.com/new"
    echo "   - Repository name: $REPO_NAME"
    echo "   - Chọn Public hoặc Private"
    echo "   - KHÔNG tích 'Initialize with README'"
    echo "   - Click 'Create repository'"
    echo ""
    echo "2. Sau đó chạy lệnh push:"
    echo "   git push -u origin main"
    echo ""
    echo "3. Khi được hỏi username/password:"
    echo "   - Username: $GITHUB_USERNAME"
    echo "   - Password: Nhập Personal Access Token (KHÔNG phải password GitHub)"
    echo "   - Tạo token tại: https://github.com/settings/tokens"
    echo ""
    
    read -p "Bạn đã tạo repository trên GitHub chưa? (y/n): " REPO_CREATED
    
    if [ "$REPO_CREATED" = "y" ] || [ "$REPO_CREATED" = "Y" ]; then
        echo ""
        echo "=== Push lên GitHub ==="
        echo "Đang push lên origin/main..."
        git push -u origin main
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Push thành công!"
            echo ""
            echo "Repository của bạn: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
        else
            echo ""
            echo "❌ Push thất bại!"
            echo ""
            echo "Các nguyên nhân có thể:"
            echo "   1. Repository chưa được tạo trên GitHub"
            echo "   2. Chưa cấu hình Personal Access Token"
            echo "   3. Token không có quyền 'repo'"
            echo ""
            echo "Hãy thử lại sau khi đã tạo repository và cấu hình token."
        fi
    else
        echo ""
        echo "Vui lòng tạo repository trên GitHub trước, sau đó chạy:"
        echo "  git push -u origin main"
    fi
else
    echo "Không có thay đổi để commit"
    echo ""
    echo "Để push code hiện tại, chạy:"
    echo "  git push -u origin main"
fi

echo ""
echo "✅ Hoàn thành cấu hình!"
echo ""
echo "Repository URL: $REPO_URL"

