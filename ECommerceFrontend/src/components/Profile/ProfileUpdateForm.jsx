import { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import { updateProfile } from "../../services/profile";
import { useAuth } from "../../context/AuthContext/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProfileUpdateForm = () => {
  const { user, loadUser } = useAuth();
  const [userName, setUserName] = useState(user?.userName || "");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (userName && userName !== user.userName)
      formData.append("userName", userName);
    if (password.trim()) formData.append("password", password);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      await updateProfile(formData);
      setMessage("Perfil actualizado correctamente.");
      await loadUser();
      setPassword("");
    } catch (err) {
      setMessage("Error al actualizar el perfil.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Actualizar perfil
      </Typography>

      <TextField
        fullWidth
        label="Nombre de usuario"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        label="Nueva contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatarFile(e.target.files[0])}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: 2, display: "block" }}>
        Guardar cambios
      </Button>

      {message && <Typography sx={{ marginTop: 2 }}>{message}</Typography>}
    </form>
  );
};

export default ProfileUpdateForm;
