import { useState, useRef } from "react";
import { useI18n } from "../../../contexts/I18nContext.jsx";

const ImageUpload = ({ value, onChange, label }) => {
  const { t } = useI18n();
  const [preview, setPreview] = useState(value || "");
  const [uploadMethod, setUploadMethod] = useState(value ? (value.startsWith("data:") ? "file" : "url") : "url");
  const fileInputRef = useRef(null);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    onChange(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert(t("invalidImageFile"));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(t("fileSizeExceeded"));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);
      onChange(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label || t("bookCover")}</label>
      
      {/* Method Toggle */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setUploadMethod("url")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            uploadMethod === "url"
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {t("enterImageUrl")}
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod("file")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            uploadMethod === "file"
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {t("uploadImage")}
        </button>
      </div>

      {/* URL Input */}
      {uploadMethod === "url" && (
        <div className="space-y-2">
          <input
            type="url"
            value={preview || ""}
            onChange={handleUrlChange}
            placeholder={t("pasteImageUrl")}
            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500">{t("enterImageUrl")}</p>
        </div>
      )}

      {/* File Upload */}
      {uploadMethod === "file" && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center gap-2 w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 text-gray-700 cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">{t("selectImageFile")}</span>
          </label>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative mt-4">
          <div className="relative w-full max-w-xs mx-auto">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg border-2 border-white/20 shadow-lg"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='14' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EKhông thể tải ảnh%3C/text%3E%3C/svg%3E";
              }}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
              title={t("removeImage")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

