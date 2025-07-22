import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { getUserProfile } from "../../services/profile";
import tokenEvents from "../../utils/tokenEvents"

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const saveTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      saveTokens(res.data);

      await loadUser();
      navigate("/profile");
    } catch (error) {
      console.error(
        "Error en login:",
        error?.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      await axiosInstance.post("/auth/signup", userData);
      await login(userData.email, userData.password);
    } catch (error) {
      console.error(
        "Error en registro:",
        error?.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    navigate("/login");
  };

  const loadUser = async () => {
    try {
      const res = await getUserProfile();
      console.log("[Auth] Perfil cargado:", res.data);
      setUser(res.data);
    } catch (error) {
      console.warn("[Auth] Token inválido o error al cargar perfil.");
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      loadUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    const unsubscribe = tokenEvents.subscribe((newToken) => {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newToken}`;
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        loadUser,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};