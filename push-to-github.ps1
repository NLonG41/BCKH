# Set UTF-8 encoding
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['*:Encoding'] = 'utf8'

# Project directory path - sử dụng đường dẫn hiện tại nếu đang ở trong thư mục dự án
$projectPath = $PSScriptRoot
if (-not $projectPath) {
    $projectPath = Get-Location
}
# Nếu không tìm thấy, thử đường dẫn tuyệt đối
if (-not (Test-Path "$projectPath\.git") -and -not (Test-Path "$projectPath\package.json")) {
    $projectPath = "D:\Báo cáo khoa học"
}

# Change to project directory
try {
    if (Test-Path $projectPath) {
        Set-Location $projectPath -ErrorAction Stop
        Write-Host "Changed to project directory: $(Get-Location)" -ForegroundColor Green
    } else {
        Write-Host "Warning: Could not find project directory at: $projectPath" -ForegroundColor Yellow
        Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
        Write-Host "Please ensure you are in the project directory or update the path in the script." -ForegroundColor Yellow
        $continue = Read-Host "Continue with current directory? (y/n)"
        if ($continue -ne "y") {
            exit 1
        }
    }
} catch {
    Write-Host "Error: Could not change to project directory." -ForegroundColor Red
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
    Write-Host "Please run this script from the project directory or update the path." -ForegroundColor Red
    exit 1
}

# Initialize git if needed
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Check for remote
$remote = git remote -v
if (-not $remote) {
    Write-Host "No remote repository configured." -ForegroundColor Yellow
    Write-Host "Adding remote: https://github.com/NLonG41/Qu-n-l-th-vi-n-.git" -ForegroundColor Yellow
    git remote add origin "https://github.com/NLonG41/Qu-n-l-th-vi-n-.git"
} else {
    Write-Host "Remote repository found:" -ForegroundColor Green
    git remote -v
}

# Add all files
Write-Host "`nAdding files..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Initial commit: Library management system"
    
    # Push to GitHub
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    $branch = git branch --show-current
    if (-not $branch) {
        $branch = "main"
        git branch -M main
    }
    
    git push -u origin $branch
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "`n❌ Push failed!" -ForegroundColor Red
        Write-Host "`nCác nguyên nhân có thể:" -ForegroundColor Yellow
        Write-Host "  1. Chưa đăng nhập GitHub hoặc thiếu credentials" -ForegroundColor Yellow
        Write-Host "  2. Repository chưa tồn tại trên GitHub" -ForegroundColor Yellow
        Write-Host "  3. Không có quyền push vào repository" -ForegroundColor Yellow
        Write-Host "  4. Cần cấu hình Personal Access Token" -ForegroundColor Yellow
        Write-Host "`nGiải pháp:" -ForegroundColor Cyan
        Write-Host "  - Tạo Personal Access Token tại: https://github.com/settings/tokens" -ForegroundColor Cyan
        Write-Host "  - Sử dụng token làm password khi push" -ForegroundColor Cyan
        Write-Host "  - Hoặc cấu hình SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh" -ForegroundColor Cyan
        Write-Host "  - Kiểm tra URL remote: git remote -v" -ForegroundColor Cyan
    }
} else {
    Write-Host "No changes to commit." -ForegroundColor Yellow
}

Write-Host "`nDone!" -ForegroundColor Green

