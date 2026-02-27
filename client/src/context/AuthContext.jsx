import { createContext, useState, useEffect, useContext } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const { data } = await api.get("/auth/me");
          setUser(data.data);
          setToken(storedToken);
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (email, password) => {
    console.log("🔐 Attempting login for:", email);
    const { data } = await api.post("/auth/login", { email, password });
    console.log("✅ Login successful:", data.data.name);
    localStorage.setItem("token", data.data.token);
    setUser(data.data);
    setToken(data.data.token);
    return data;
  };

  const register = async (name, email, password) => {
    console.log("📝 Attempting registration for:", email);
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    console.log("✅ Registration successful:", data.data.name);
    localStorage.setItem("token", data.data.token);
    setUser(data.data);
    setToken(data.data.token);
    return data;
  };

  const logout = () => {
    console.log("👋 User logging out");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
