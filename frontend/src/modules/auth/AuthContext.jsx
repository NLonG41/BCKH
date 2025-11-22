import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../../services/authApi.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("library:user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("library:token"));

  useEffect(() => {
    if (user) {
      localStorage.setItem("library:user", JSON.stringify(user));
    } else {
      localStorage.removeItem("library:user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("library:token", token);
    } else {
      localStorage.removeItem("library:token");
    }
  }, [token]);

  const setSession = (response) => {
    setUser(response.user);
    setToken(response.token);
  };

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    setSession(response);
  };

  const registerUser = async (payload) => {
    const response = await authApi.register(payload);
    setSession(response);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

