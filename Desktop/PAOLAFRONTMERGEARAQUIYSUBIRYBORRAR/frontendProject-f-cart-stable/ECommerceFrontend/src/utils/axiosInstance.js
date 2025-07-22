import axios from "axios";
import tokenEvents from "../utils/tokenEvents";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const is401 = error?.response?.status === 401;
    const isNotAuthEndpoint =
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh");

    if (is401 && isNotAuthEndpoint && !originalRequest._retry) {
      console.log("[Interceptor] Token expirado. Intentando refrescar...");

      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.warn("[Interceptor] No hay refreshToken. Cerrando sesión.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // 🔥 Forzar logout inmediato
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api"
          }/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = data.accessToken;
        console.log("[Interceptor] Nuevo accessToken:", newAccessToken);

        localStorage.setItem("accessToken", newAccessToken);
        tokenEvents.notify(newAccessToken);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("[Interceptor] Error al refrescar token:", refreshError);

        // 🔥 El refreshToken ha fallado → Cierre de sesión
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Redirige al login

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
