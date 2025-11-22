# Script để xóa Git credentials trong Windows Credential Manager
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "=== Xóa Git Credentials trong Windows Credential Manager ===" -ForegroundColor Cyan
Write-Host ""

# Tìm tất cả Git credentials
Write-Host "Đang tìm Git credentials..." -ForegroundColor Yellow
Write-Host ""

# Liệt kê tất cả Git credentials
$gitCredentials = cmdkey /list | Select-String -Pattern "git|github" -CaseSensitive:$false

if ($gitCredentials) {
    Write-Host "Tìm thấy các Git credentials sau:" -ForegroundColor Green
    Write-Host ""
    $gitCredentials | ForEach-Object {
        Write-Host "  - $_" -ForegroundColor Yellow
    }
    Write-Host ""
    
    # Xóa từng credential
    $gitCredentials | ForEach-Object {
        if ($_ -match "Target:\s*(.+)") {
            $target = $matches[1]
            Write-Host "Đang xóa: $target" -ForegroundColor Yellow
            cmdkey /delete:"$target" 2>&1 | Out-Null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "  ✅ Đã xóa thành công" -ForegroundColor Green
            } else {
                Write-Host "  ⚠️  Không thể xóa (có thể đã bị xóa trước đó)" -ForegroundColor Yellow
            }
        }
    }
} else {
    Write-Host "Không tìm thấy Git credentials nào" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Xóa tất cả Git-related credentials ===" -ForegroundColor Cyan

# Xóa các loại Git credentials phổ biến
$commonGitTargets = @(
    "git:https://github.com",
    "git:https://github.com/",
    "github.com",
    "git:https://github.com/tanyb123",
    "git:https://github.com/NLonG41"
)

foreach ($target in $commonGitTargets) {
    Write-Host "Đang thử xóa: $target" -ForegroundColor Yellow
    $result = cmdkey /delete:"$target" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Đã xóa: $target" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "=== Kiểm tra lại ===" -ForegroundColor Cyan
$remaining = cmdkey /list | Select-String -Pattern "git|github" -CaseSensitive:$false
if ($remaining) {
    Write-Host "Còn lại các credentials sau:" -ForegroundColor Yellow
    $remaining | ForEach-Object {
        Write-Host "  - $_" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "Bạn có thể xóa thủ công bằng cách:" -ForegroundColor Cyan
    Write-Host "  1. Mở 'Credential Manager' từ Control Panel" -ForegroundColor White
    Write-Host "  2. Vào 'Windows Credentials'" -ForegroundColor White
    Write-Host "  3. Tìm và xóa các mục liên quan đến 'git' hoặc 'github'" -ForegroundColor White
} else {
    Write-Host "✅ Không còn Git credentials nào" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Xóa Git config credentials (nếu có) ===" -ForegroundColor Cyan

# Xóa credential helper trong git config
try {
    $credentialHelper = git config --global --get credential.helper
    if ($credentialHelper) {
        Write-Host "Tìm thấy credential helper: $credentialHelper" -ForegroundColor Yellow
        Write-Host "Bạn có muốn xóa credential helper không? (y/n): " -NoNewline -ForegroundColor Yellow
        $removeHelper = Read-Host
        if ($removeHelper -eq "y" -or $removeHelper -eq "Y") {
            git config --global --unset credential.helper
            Write-Host "✅ Đã xóa credential helper" -ForegroundColor Green
        }
    } else {
        Write-Host "Không tìm thấy credential helper trong git config" -ForegroundColor Green
    }
} catch {
    Write-Host "Không thể kiểm tra git config" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Hoàn thành!" -ForegroundColor Green
Write-Host ""
Write-Host "Bây giờ bạn có thể:" -ForegroundColor Cyan
Write-Host "  1. Chạy script setup-my-github.ps1 để cấu hình repository mới" -ForegroundColor White
Write-Host "  2. Khi push, bạn sẽ được yêu cầu nhập username và token mới" -ForegroundColor White

