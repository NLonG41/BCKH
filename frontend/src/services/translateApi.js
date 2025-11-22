// Google Translate API Service
// Gọi qua backend proxy để tránh CORS và bảo mật API key

import axiosClient from "./http.js";

// Cache để tránh gọi API nhiều lần cho cùng một text
const translationCache = new Map();

/**
 * Dịch text từ tiếng Việt sang tiếng Anh
 * CHỈ gọi API khi targetLang === "en"
 * @param {string} text - Text cần dịch
 * @param {string} targetLang - Ngôn ngữ đích (chỉ "en")
 * @returns {Promise<string>} - Text đã được dịch
 */
export const translateText = async (text, targetLang = "en") => {
  // Nếu không phải tiếng Anh, return text gốc (không gọi API)
  if (targetLang !== "en") {
    return text;
  }

  // Nếu text rỗng, return luôn
  if (!text || !text.trim()) {
    return text;
  }

  // Kiểm tra cache
  const cacheKey = `${text}_${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const response = await axiosClient.post("/translate/text", {
      text,
      target: targetLang,
      source: "vi"
    });

    const translatedText = response.data.translatedText || text;

    // Lưu vào cache
    translationCache.set(cacheKey, translatedText);

    return translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    // Fallback: return text gốc nếu API fail
    return text;
  }
};

/**
 * Dịch nhiều text cùng lúc (batch translation)
 * CHỈ gọi API khi targetLang === "en"
 * @param {string[]} texts - Mảng các text cần dịch
 * @param {string} targetLang - Ngôn ngữ đích (chỉ "en")
 * @returns {Promise<string[]>} - Mảng các text đã được dịch
 */
export const translateBatch = async (texts, targetLang = "en") => {
  // Nếu không phải tiếng Anh, return texts gốc (không gọi API)
  if (targetLang !== "en") {
    console.warn("translateBatch: Only English translation is supported. Returning original texts.");
    return texts;
  }

  if (!texts || texts.length === 0) {
    return texts;
  }

  // Filter texts chưa có trong cache
  const textsToTranslate = [];
  const cacheResults = [];
  const indexMap = [];

  texts.forEach((text, index) => {
    const cacheKey = `${text}_${targetLang}`;
    if (translationCache.has(cacheKey)) {
      cacheResults[index] = translationCache.get(cacheKey);
    } else {
      textsToTranslate.push(text);
      indexMap.push(index);
    }
  });

  // Nếu tất cả đã có trong cache
  if (textsToTranslate.length === 0) {
    return cacheResults;
  }

  try {
    const response = await axiosClient.post("/translate/batch", {
      texts: textsToTranslate,
      target: targetLang,
      source: "vi"
    });

    const translations = response.data.translations || [];

    // Merge kết quả
    const results = [...cacheResults];
    indexMap.forEach((originalIndex, idx) => {
      const translated = translations[idx] || textsToTranslate[idx];
      results[originalIndex] = translated;
      // Cache lại
      const cacheKey = `${textsToTranslate[idx]}_${targetLang}`;
      translationCache.set(cacheKey, translated);
    });

    return results;
  } catch (error) {
    console.error("Batch translation error:", error);
    // Fallback: return texts gốc
    return texts;
  }
};

/**
 * Clear translation cache
 */
export const clearTranslationCache = () => {
  translationCache.clear();
};

