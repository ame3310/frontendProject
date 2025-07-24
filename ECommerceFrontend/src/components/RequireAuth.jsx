import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext/AuthContext";

export const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  return user ? children : <Navigate to="/login" />;
};