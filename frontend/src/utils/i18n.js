// Translation data - Chỉ giữ tiếng Việt, tiếng Anh sẽ được dịch tự động bằng Google Translate API
const translations = {
  vi: {
    // Auth
    login: "Đăng nhập",
    register: "Đăng ký",
    logout: "Đăng xuất",
    username: "Tài khoản",
    password: "Mật khẩu",
    fullName: "Họ tên",
    email: "Email",
    createAccount: "Tạo tài khoản",
    alreadyHaveAccount: "Đã có tài khoản",
    loginFailed: "Đăng nhập thất bại",
    registerFailed: "Đăng ký thất bại",
    
    // Common
    welcome: "Xin chào",
    today: "Ngày hôm nay",
    loading: "Đang tải...",
    save: "Lưu",
    cancel: "Hủy",
    edit: "Sửa",
    delete: "Xóa",
    confirm: "Xác nhận",
    close: "Đóng",
    search: "Tìm kiếm",
    
    // Dashboard
    home: "Trang chủ",
    books: "Danh sách sách",
    myLoans: "Sách đang mượn",
    history: "Lịch sử",
    welcomeToLibrary: "Chào mừng đến với thư viện",
    librarySystem: "Hệ thống quản lý thư viện",
    topBorrowed: "Top sách được mượn nhiều",
    
    // Books
    bookList: "Danh mục sách",
    allCategories: "Tất cả thể loại",
    filterByCategory: "Lọc theo thể loại:",
    category: "Thể loại",
    author: "Tác giả",
    title: "Tên sách",
    quantity: "Số lượng",
    available: "Còn lại",
    borrow: "Mượn",
    outOfStock: "Hết sách",
    viewDescription: "Xem mô tả",
    description: "Mô tả",
    books: "Sách",
    processing: "Đang xử lý...",
    description: "Mô tả",
    bookCover: "Ảnh bìa sách",
    enterImageUrl: "Nhập Link",
    uploadImage: "Tải ảnh lên",
    pasteImageUrl: "Dán URL ảnh bìa sách...",
    selectImageFile: "Chọn file ảnh",
    recommendations: "Gợi ý dành cho bạn",
    
    // Loans
    activeLoans: "Sách đang mượn",
    loanHistory: "Lịch sử mượn sách",
    dueDate: "Hạn trả",
    borrowDate: "Ngày mượn",
    returnDate: "Ngày trả",
    status: "Trạng thái",
    borrowed: "Đang mượn",
    returned: "Đã trả",
    overdue: "Quá hạn",
    noActiveLoans: "Bạn chưa mượn quyển nào",
    noHistory: "Chưa có lịch sử mượn",
    noLoansYet: "Hiện chưa có ai mượn sách",
    loadingData: "Đang tải dữ liệu...",
    student: "Sinh viên",
    borrowDateLabel: "Ngày mượn",
    action: "Hành động",
    receivedBook: "Đã nhận lại sách",
    confirmReturn: "Xác nhận trả sách",
    returnBook: "Trả sách",
    
    // Management (Librarian)
    manageLoans: "Quản lý mượn trả",
    manageBooks: "Quản lý sách",
    manageUsers: "Quản lý sinh viên",
    notifications: "Thông báo",
    studentName: "Tên SV",
    bookName: "Tên sách",
    totalLoans: "Tổng",
    loans: "phiếu",
    totalBooks: "tựa sách",
    totalAccounts: "tài khoản",
    addBook: "Thêm sách",
    updateBook: "Cập nhật sách",
    cancelEdit: "Hủy chỉnh sửa",
    resetPassword: "Đặt lại mật khẩu",
    lock: "Khóa",
    unlock: "Mở khóa",
    active: "Đang hoạt động",
    locked: "Đã khóa",
    sendNotification: "Gửi thông báo nhanh",
    selectUser: "Chọn sinh viên",
    message: "Nội dung thông báo",
    send: "Gửi",
    
    // Welcome page
    welcomeToManagement: "Chào mừng đến với hệ thống quản lý",
    libraryOverview: "Tổng quan thư viện",
    usageGuide: "Hướng dẫn sử dụng",
    guideManageLoans: "Quản lý mượn trả: Xem danh sách sách đang được mượn và xác nhận trả sách",
    guideManageBooks: "Quản lý sách: Thêm, sửa, xóa sách và cập nhật thông tin",
    guideManageUsers: "Quản lý sinh viên: Xem danh sách, khóa/mở khóa tài khoản, đặt lại mật khẩu",
    guideNotifications: "Thông báo: Gửi thông báo thủ công cho sinh viên",
    
    // Messages
    borrowSuccess: "Đăng ký mượn thành công!",
    borrowFailed: "Không thể mượn sách",
    bookUpdated: "Đã cập nhật thông tin sách",
    bookAdded: "Đã thêm sách mới",
    bookDeleted: "Đã xóa sách",
    cannotSaveBook: "Không thể lưu sách",
    confirmDeleteBook: "Bạn chắc chắn muốn xóa sách này?",
    userStatusChanged: "Đã thay đổi trạng thái tài khoản",
    passwordReset: "Đã đặt lại mật khẩu",
    userDeleted: "Đã xóa tài khoản",
    confirmDeleteUser: "Bạn chắc chắn muốn xóa tài khoản này?",
    enterNewPassword: "Nhập mật khẩu mới cho",
    defaultPassword: "để trống = 123456",
    passwordResetSuccess: "Đã đặt lại mật khẩu",
    notificationSent: "Thông báo đã được gửi",
    cannotSendNotification: "Không thể gửi thông báo",
    selectImageFile: "Chọn ảnh (PNG, JPG, JPEG - tối đa 5MB)",
    enterImageUrl: "Nhập URL ảnh từ internet",
    removeImage: "Xóa ảnh",
    invalidImageFile: "Vui lòng chọn file ảnh (PNG, JPG, JPEG, etc.)",
    fileSizeExceeded: "Kích thước file không được vượt quá 5MB",
    returnConfirmed: "Đã xác nhận trả sách",
    scanOverdue: "Quét quá hạn & gửi thông báo",
    scanFailed: "Không thể quét quá hạn",
    updateLoanFailed: "Không thể cập nhật phiếu mượn",
    
    // Errors
    accountLocked: "Tài khoản đã bị khóa",
    wrongCredentials: "Sai tài khoản hoặc mật khẩu",
    bookOutOfStock: "Sách tạm hết",
    noRecommendations: "Chưa có gợi ý phù hợp",
    studentRegisterNote: "Sinh viên tự đăng ký bằng nút",
    staffLoginNote: "Nhân sự đăng nhập bằng tài khoản được cấp",
    noBorrowData: "Chưa có dữ liệu mượn sách",
    recommendation: "Gợi ý",
    borrowedCount: "Số lượt mượn",
    remainingQuantity: "Số lượng còn lại",
    noDescription: "Chưa có mô tả cho cuốn sách này",
    times: "lần",
    noNotifications: "Không có thông báo",
    markAsRead: "Đánh dấu đã đọc"
  }
  // Tiếng Anh sẽ được dịch tự động bằng Google Translate API
};

// Get translation function (chỉ dùng cho tiếng Việt)
export const t = (key, lang = "vi") => {
  if (lang === "vi") {
    return translations.vi[key] || key;
  }
  // Tiếng Anh sẽ được xử lý trong I18nContext với Google Translate
  return translations.vi[key] || key; // Fallback về tiếng Việt
};

// Get all translations for a language (chỉ tiếng Việt)
export const getTranslations = (lang = "vi") => {
  if (lang === "vi") {
    return translations.vi;
  }
  // Tiếng Anh sẽ được dịch động trong I18nContext
  return translations.vi; // Fallback
};

export default translations;

