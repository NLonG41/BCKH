import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getTranslations } from "../utils/i18n.js";
import { translateBatch } from "../services/translateApi.js";

const I18nContext = createContext();

// Cache cho translations đã dịch
const translatedCache = {
  en: null,
  loading: false
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("library:language");
    return saved || "vi";
  });
  const [enTranslations, setEnTranslations] = useState(translatedCache.en);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    localStorage.setItem("library:language", language);
  }, [language]);

  // CHỈ gọi API dịch khi chuyển sang tiếng Anh
  // Tiếng Việt giữ nguyên, KHÔNG gọi API
  useEffect(() => {
    // Chỉ dịch khi language === "en"
    if (language === "en" && !enTranslations && !translatedCache.loading) {
      loadEnglishTranslations();
    }
    // Nếu language === "vi", không làm gì cả, dùng translations.vi trực tiếp
  }, [language, enTranslations]);

  // CHỈ gọi API khi language === "en"
  const loadEnglishTranslations = async () => {
    // Double check: chỉ dịch khi đang ở chế độ tiếng Anh
    if (language !== "en") {
      return;
    }

    if (translatedCache.en) {
      setEnTranslations(translatedCache.en);
      return;
    }

    if (translatedCache.loading) {
      return;
    }

    translatedCache.loading = true;
    setIsTranslating(true);

    try {
      const viTranslations = getTranslations("vi");
      const viTexts = Object.values(viTranslations);
      const viKeys = Object.keys(viTranslations);

      // CHỈ gọi API dịch khi ở đây (language === "en")
      const translatedTexts = await translateBatch(viTexts, "en");

      // Tạo object translations.en từ kết quả dịch
      const enTrans = {};
      viKeys.forEach((key, index) => {
        enTrans[key] = translatedTexts[index] || viTexts[index];
      });

      translatedCache.en = enTrans;
      setEnTranslations(enTrans);
    } catch (error) {
      console.error("Failed to load English translations:", error);
      // Fallback: sử dụng tiếng Việt nếu dịch thất bại
      setEnTranslations(null);
    } finally {
      translatedCache.loading = false;
      setIsTranslating(false);
    }
  };

  const translations = useMemo(() => {
    // Tiếng Việt: dùng trực tiếp, KHÔNG gọi API
    if (language === "vi") {
      return getTranslations("vi");
    }
    // Tiếng Anh: dùng bản dịch từ API (nếu có), nếu chưa có thì fallback về tiếng Việt
    if (language === "en") {
      return enTranslations || getTranslations("vi"); // Fallback về vi nếu chưa dịch xong
    }
    // Default: tiếng Việt
    return getTranslations("vi");
  }, [language, enTranslations]);

  const translate = (key) => {
    if (language === "vi") {
      return translations[key] || key;
    }
    if (language === "en") {
      return translations[key] || key;
    }
    return key;
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
    // CHỈ gọi API khi chuyển sang tiếng Anh
    // Nếu chuyển về tiếng Việt, không làm gì cả (dùng translations.vi trực tiếp)
    if (lang === "en" && !enTranslations && !translatedCache.loading) {
      loadEnglishTranslations();
    }
    // lang === "vi": không cần làm gì, translations.vi đã sẵn sàng
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        translations,
        t: translate,
        switchLanguage,
        isTranslating
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
};

