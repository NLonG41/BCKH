import { useState } from "react";
import { bookApi } from "../../../services/bookApi.js";
import { useI18n } from "../../../contexts/I18nContext.jsx";
import ImageUpload from "./ImageUpload.jsx";

const emptyBook = {
  title: "",
  author: "",
  category: "",
  quantity: 1,
  description: "",
  coverUrl: ""
};

const BookManager = ({ books, onUpdated, onMessage }) => {
  const { t } = useI18n();
  const [form, setForm] = useState(emptyBook);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await bookApi.update(editingId, { ...form, quantity: Number(form.quantity) });
        onMessage?.(t("bookUpdated"));
      } else {
        await bookApi.create({ ...form, quantity: Number(form.quantity) });
        onMessage?.(t("bookAdded"));
      }
      setForm(emptyBook);
      setEditingId(null);
      onUpdated?.();
    } catch (error) {
      onMessage?.(error.response?.data?.message || t("cannotSaveBook"));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setForm({
      title: book.title,
      author: book.author || "",
      category: book.category,
      quantity: book.quantity,
      description: book.description || "",
      coverUrl: book.coverUrl || ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t("confirmDeleteBook"))) return;
    await bookApi.remove(id);
    onMessage?.(t("bookDeleted"));
    onUpdated?.();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <input
          value={form.title}
          onChange={handleChange("title")}
          placeholder={t("title")}
          required
          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <input
          value={form.author}
          onChange={handleChange("author")}
          placeholder={t("author")}
          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <input
          value={form.category}
          onChange={handleChange("category")}
          placeholder={t("category")}
          required
          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <input
          type="number"
          min={1}
          value={form.quantity}
          onChange={handleChange("quantity")}
          placeholder={t("quantity")}
          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <div className="md:col-span-2">
          <ImageUpload
            value={form.coverUrl}
            onChange={(url) => setForm({ ...form, coverUrl: url })}
            label={t("bookCover")}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("description")}</label>
          <textarea
            value={form.description}
            onChange={handleChange("description")}
            placeholder={t("description")}
            rows={5}
            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-white px-4 py-2 rounded-lg font-semibold"
          >
            {editingId ? t("updateBook") : t("addBook")}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyBook);
              }}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              {t("cancelEdit")}
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {books.map((book) => (
          <div
            key={book._id}
            className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 flex gap-4 items-start transition-colors"
          >
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-20 h-28 object-cover rounded-lg border border-gray-300 flex-shrink-0"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">{book.title}</p>
              <p className="text-xs text-gray-600 mt-1">
                {book.author} • {book.category}
              </p>
              <p className="text-xs text-gray-500 mt-1">{t("quantity")}: {book.quantity}</p>
              {book.description && (
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {book.description}
                </p>
              )}
            </div>
            <div className="flex gap-3 text-sm flex-shrink-0">
              <button 
                onClick={() => handleEdit(book)} 
                className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors"
              >
                {t("edit")}
              </button>
              <button 
                onClick={() => handleDelete(book._id)} 
                className="text-rose-600 hover:text-rose-700 font-medium hover:underline transition-colors"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookManager;

