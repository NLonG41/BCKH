# Script PowerShell để cấu hình Git với repository GitHub của bạn
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "=== Cấu hình Git Repository cho GitHub của bạn ===" -ForegroundColor Cyan
Write-Host ""

# Chuyển đến thư mục dự án
$projectPath = $PSScriptRoot
if (-not $projectPath) {
    $projectPath = Get-Location
}
if (-not (Test-Path "$projectPath\package.json")) {
    $projectPath = "D:\Báo cáo khoa học"
}

try {
    if (Test-Path $projectPath) {
        Set-Location $projectPath -ErrorAction Stop
        Write-Host "📁 Thư mục hiện tại: $(Get-Location)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Không tìm thấy thư mục dự án tại: $projectPath" -ForegroundColor Yellow
        Write-Host "Đang sử dụng thư mục hiện tại: $(Get-Location)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Lỗi: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Nhập username GitHub
$GITHUB_USERNAME = Read-Host "Nhập username GitHub của bạn"
if ([string]::IsNullOrWhiteSpace($GITHUB_USERNAME)) {
    Write-Host "❌ Username không được để trống!" -ForegroundColor Red
    exit 1
}

# Nhập tên repository
$REPO_NAME = Read-Host "Nhập tên repository (hoặc Enter để dùng 'library-management')"
if ([string]::IsNullOrWhiteSpace($REPO_NAME)) {
    $REPO_NAME = "library-management"
}

Write-Host ""
Write-Host "=== Khởi tạo Git Repository ===" -ForegroundColor Yellow

# Khởi tạo git nếu chưa có
if (-not (Test-Path ".git")) {
    Write-Host "Đang khởi tạo git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "Git repository đã tồn tại" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Cấu hình Remote Repository ===" -ForegroundColor Yellow

# Xóa remote cũ nếu có
$remote = git remote -v 2>$null
if ($remote) {
    Write-Host "Đang xóa remote cũ..." -ForegroundColor Yellow
    git remote remove origin 2>$null
}

# Thêm remote mới
$REPO_URL = "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
Write-Host "Đang thêm remote: $REPO_URL" -ForegroundColor Yellow
git remote add origin $REPO_URL

Write-Host ""
Write-Host "✅ Remote đã được cấu hình:" -ForegroundColor Green
git remote -v

Write-Host ""
Write-Host "=== Cấu hình Branch ===" -ForegroundColor Yellow

# Đặt branch main
$currentBranch = git branch --show-current 2>$null
if (-not $currentBranch) {
    Write-Host "Tạo branch main..." -ForegroundColor Yellow
    git checkout -b main 2>$null
    if ($LASTEXITCODE -ne 0) {
        git branch -M main
    }
} else {
    Write-Host "Branch hiện tại: $currentBranch" -ForegroundColor Green
    if ($currentBranch -ne "main") {
        Write-Host "Đổi tên branch thành main..." -ForegroundColor Yellow
        git branch -M main
    }
}

Write-Host ""
Write-Host "=== Thêm files ===" -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "=== Kiểm tra thay đổi ===" -ForegroundColor Yellow

$status = git status --porcelain
if ($status) {
    Write-Host "Có thay đổi để commit" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== Commit changes ===" -ForegroundColor Yellow
    git commit -m "Initial commit: Library management system"
    
    Write-Host ""
    Write-Host "=== Hướng dẫn Push lên GitHub ===" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "⚠️  QUAN TRỌNG: Trước khi push, bạn cần:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Tạo repository trên GitHub:" -ForegroundColor White
    Write-Host "   - Vào: https://github.com/new" -ForegroundColor Gray
    Write-Host "   - Repository name: $REPO_NAME" -ForegroundColor Gray
    Write-Host "   - Chọn Public hoặc Private" -ForegroundColor Gray
    Write-Host "   - KHÔNG tích 'Initialize with README'" -ForegroundColor Gray
    Write-Host "   - Click 'Create repository'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Sau đó chạy lệnh push:" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Khi được hỏi username/password:" -ForegroundColor White
    Write-Host "   - Username: $GITHUB_USERNAME" -ForegroundColor Gray
    Write-Host "   - Password: Nhập Personal Access Token" -ForegroundColor Gray
    Write-Host "   - Tạo token tại: https://github.com/settings/tokens" -ForegroundColor Gray
    Write-Host ""
    
    $REPO_CREATED = Read-Host "Bạn đã tạo repository trên GitHub chưa? (y/n)"
    
    if ($REPO_CREATED -eq "y" -or $REPO_CREATED -eq "Y") {
        Write-Host ""
        Write-Host "=== Push lên GitHub ===" -ForegroundColor Yellow
        Write-Host "Đang push lên origin/main..." -ForegroundColor Yellow
        git push -u origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Push thành công!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Repository của bạn: https://github.com/$GITHUB_USERNAME/$REPO_NAME" -ForegroundColor Cyan
        } else {
            Write-Host ""
            Write-Host "❌ Push thất bại!" -ForegroundColor Red
            Write-Host ""
            Write-Host "Các nguyên nhân có thể:" -ForegroundColor Yellow
            Write-Host "   1. Repository chưa được tạo trên GitHub" -ForegroundColor Yellow
            Write-Host "   2. Chưa cấu hình Personal Access Token" -ForegroundColor Yellow
            Write-Host "   3. Token không có quyền 'repo'" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "Hãy thử lại sau khi đã tạo repository và cấu hình token." -ForegroundColor Yellow
        }
    } else {
        Write-Host ""
        Write-Host "Vui lòng tạo repository trên GitHub trước, sau đó chạy:" -ForegroundColor Yellow
        Write-Host "  git push -u origin main" -ForegroundColor Cyan
    }
} else {
    Write-Host "Không có thay đổi để commit" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Để push code hiện tại, chạy:" -ForegroundColor Yellow
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "✅ Hoàn thành cấu hình!" -ForegroundColor Green
Write-Host ""
Write-Host "Repository URL: $REPO_URL" -ForegroundColor Cyan

