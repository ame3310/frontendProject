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
    <form onSubmit={handleSubmit} className="profile-update-form">
      <Typography variant="h5" gutterBottom>
        Actualizar perfil
      </Typography>

      <TextField
        fullWidth
        label="Nombre de usuario"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        sx={{
            marginBottom: 2,
            backgroundColor: "var(--bg)",
            input: {
              color: "var(--text)",
            },
            "& .MuiInputLabel-root": {
              color: "var(--accent)",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--accent)",
              },
              "&:hover fieldset": {
                borderColor: "lightblue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--accent)",
              },
            },
          }}
      />

      <TextField
        fullWidth
        label="Nueva contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
                  marginBottom: 2,
                  backgroundColor: "var(--bg)",
                  input: {
                    color: "var(--text)",
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--accent)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--accent)",
                    },
                    "&:hover fieldset": {
                      borderColor: "lightblue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--accent)",
                    },
                  },
                }}
      />

      <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setAvatarFile(e.target.files[0])}
            />

      <label
        htmlFor="avatar-upload"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          backgroundColor: "var(--accent)",
          color: "var(--primary-dark)",
          borderRadius: "12px",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "1rem",
          userSelect: "none",
        }}
      >
        {avatarFile ? "Archivo seleccionado: " + avatarFile.name : "Seleccionar avatar"}
      </label>

      <Button
        type="submit"
        variant="contained"
        sx={{
        mt: 2,
        display: "block",
        backgroundColor: "var(--accent)",
        color: "var(--primary-dark)",
        borderRadius: "12px",
        fontWeight: "bold",
        "&:hover": {
          filter: "brightness(1.1)",
          backgroundColor: "var(--accent)", 
          }
        }}>
        Guardar cambios
      </Button>

      {message && <Typography sx={{ marginTop: 2 }}>{message}</Typography>}
    </form>
  );
};

export default ProfileUpdateForm;
