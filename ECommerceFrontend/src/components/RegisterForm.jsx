import { useState } from "react";
import { useAuth } from "../context/AuthContext/AuthContext";

export const RegisterForm = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({ userName: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input
        name="userName"
        placeholder="Nombre"
        value={form.userName}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Correo"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
};