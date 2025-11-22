// Google Translate API Controller
// Proxy để tránh CORS và bảo mật API key

const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const API_URL = "https://translation.googleapis.com/language/translate/v2";

/**
 * Dịch một text
 */
export const translateText = async (req, res) => {
  try {
    const { text, target = "en", source = "vi" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    if (!GOOGLE_TRANSLATE_API_KEY) {
      return res.status(500).json({ error: "Google Translate API key not configured" });
    }

    const response = await fetch(`${API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: text,
        target,
        source,
        format: "text"
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Google Translate API error:", errorData);
      return res.status(response.status).json({
        error: "Translation failed",
        details: errorData
      });
    }

    const data = await response.json();
    const translatedText = data.data?.translations?.[0]?.translatedText || text;

    res.json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation service error", message: error.message });
  }
};

/**
 * Dịch nhiều text cùng lúc (batch)
 */
export const translateBatch = async (req, res) => {
  try {
    const { texts, target = "en", source = "vi" } = req.body;

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return res.status(400).json({ error: "Texts array is required" });
    }

    if (!GOOGLE_TRANSLATE_API_KEY) {
      return res.status(500).json({ error: "Google Translate API key not configured" });
    }

    // Google Translate API có giới hạn 128 texts mỗi request
    // Chia nhỏ nếu cần
    const batchSize = 100;
    const results = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);

      const response = await fetch(`${API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          q: batch,
          target,
          source,
          format: "text"
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Google Translate API error:", errorData);
        // Fallback: return texts gốc cho batch này
        results.push(...batch);
        continue;
      }

      const data = await response.json();
      const translations = data.data?.translations || [];
      const translatedBatch = translations.map((t) => t.translatedText || "");

      results.push(...translatedBatch);
    }

    res.json({ translations: results });
  } catch (error) {
    console.error("Batch translation error:", error);
    res.status(500).json({ error: "Translation service error", message: error.message });
  }
};

