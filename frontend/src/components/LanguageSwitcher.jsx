import { useI18n } from "../contexts/I18nContext.jsx";

const LanguageSwitcher = () => {
  const { language, switchLanguage, isTranslating } = useI18n();

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => switchLanguage(e.target.value)}
        disabled={isTranslating}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Switch language"
      >
        <option value="vi">🇻🇳 Tiếng Việt</option>
        <option value="en">🇺🇸 English {isTranslating ? "(Đang dịch...)" : ""}</option>
      </select>
      {isTranslating && (
        <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-indigo-500 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;

