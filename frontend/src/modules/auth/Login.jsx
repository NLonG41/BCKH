import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { useI18n } from "../../contexts/I18nContext.jsx";
import LanguageSwitcher from "../../components/LanguageSwitcher.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login, registerUser } = useAuth();
  const { t } = useI18n();
  const [mode, setMode] = useState("login");
  const isRegister = mode === "register";
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullName: "",
    email: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isRegister) {
        await registerUser({
          username: form.username,
          password: form.password,
          fullName: form.fullName,
          email: form.email
        });
      } else {
        await login({ username: form.username, password: form.password });
      }
      navigate("/");
    } catch (err) {
      const fallback = isRegister ? t("registerFailed") : t("loginFailed");
      setError(err.response?.data?.message || fallback);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-slate-100 relative">
      {/* Ngôn ngữ ở góc trên bên phải */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass-panel rounded-2xl w-full max-w-md p-8 space-y-6 border border-white/10 backdrop-blur"
      >
        {/* Tiêu đề */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">
            {isRegister ? t("register") : t("login")}
          </h1>
          <p className="text-sm text-slate-300">{t("librarySystem")}</p>
        </div>

        {/* Form inputs */}
        <div className="space-y-4">
          {isRegister && (
            <>
              <label className="block text-sm">
                <span className="block mb-1 text-slate-200">{t("fullName")}</span>
                <input
                  value={form.fullName}
                  onChange={updateField("fullName")}
                  className="w-full rounded-lg px-3 py-2 bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required={isRegister}
                />
              </label>
              <label className="block text-sm">
                <span className="block mb-1 text-slate-200">{t("email")}</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={updateField("email")}
                  className="w-full rounded-lg px-3 py-2 bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required={isRegister}
                />
              </label>
            </>
          )}

          <label className="block text-sm">
            <span className="block mb-1 text-slate-200">{t("username")}</span>
            <input
              value={form.username}
              onChange={updateField("username")}
              className="w-full rounded-lg px-3 py-2 bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </label>

          <label className="block text-sm">
            <span className="block mb-1 text-slate-200">{t("password")}</span>
            <input
              type="password"
              value={form.password}
              onChange={updateField("password")}
              className="w-full rounded-lg px-3 py-2 bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </label>
        </div>

        {/* Lỗi */}
        {error && (
          <p className="text-sm text-rose-400 bg-rose-950/40 border border-rose-500/40 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Nút submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 text-white py-3 rounded-lg font-semibold disabled:opacity-70 shadow-lg shadow-cyan-500/30"
        >
          {loading ? t("loading") : isRegister ? t("register") : t("login")}
        </button>

        {/* Ghi chú + chuyển chế độ */}
        <div className="text-xs text-slate-200 text-center space-y-2">
          <p>{t("staffLoginNote")}</p>
          <p>
            {isRegister ? t("alreadyHaveAccount") : t("studentRegisterNote")}{" "}
            <button
              type="button"
              onClick={() => setMode(isRegister ? "login" : "register")}
              className="text-cyan-300 underline font-medium"
            >
              {isRegister ? t("login") : t("createAccount")}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

