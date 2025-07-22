import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  TextField,
  Rating,
  Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
import ClearIcon from "@mui/icons-material/Clear";

const ReviewsList = ({ reviews, onEdit, onDelete }) => {
  if (!reviews.length) {
    return <Typography>No tienes reviews aún.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {reviews.map((r) => (
        <ReviewItem key={r.id} review={r} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Box>
  );
};

const ReviewItem = ({ review, onEdit, onDelete }) => {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(review.comment);
  const [rating, setRating] = useState(review.rating);
  const [imageFile, setImageFile] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);

  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImageFile(e.dataTransfer.files[0]);
      setRemoveImage(false);
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("rating", Number(rating));

    if (removeImage) {
      formData.append("removeImage", "true");
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    onEdit(review.id, {
      formData,
    });
    console.log(String(Number(rating)));
    setIsEditing(false);
  };

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#1e1e2f",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}>
      {isEditing ? (
        <>
          <Rating
            value={Number(rating)}
            onChange={(_, newValue) => setRating(Number(newValue))}
            sx={{ mb: 1 }}
          />

          <TextField
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            fullWidth
            sx={{ input: { color: "#fff" }, textarea: { color: "#fff" } }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            {review.image && !removeImage && !imageFile && (
              <Box sx={{ position: "relative" }}>
                <img
                  src={`${BACKEND_URL}/uploads/${review.image}`}
                  alt="Imagen actual"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => setRemoveImage(true)}
                  sx={{ position: "absolute", top: -8, right: -8 }}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Box>
            )}

            {imageFile && (
              <Typography variant="caption">{imageFile.name}</Typography>
            )}

            <Button
              variant="outlined"
              size="small"
              onClick={() => fileInputRef.current.click()}
              startIcon={<ImageIcon />}>
              {imageFile ? "Cambiar imagen" : "Añadir imagen"}
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                  setRemoveImage(false);
                }
              }}
            />
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
            <IconButton onClick={handleSave} color="success">
              <SaveIcon />
            </IconButton>
            <IconButton onClick={() => setIsEditing(false)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(review.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <Typography fontWeight="bold">
            {"⭐".repeat(Number(review.rating) + 1)}
          </Typography>

          <Typography
            variant="body2"
            sx={{ cursor: "pointer" }}
            onClick={() => setIsEditing(true)}>
            {review.comment}
          </Typography>

          {review.image && !removeImage && (
            <img
              src={`${BACKEND_URL}/uploads/${review.image}`}
              alt="Imagen"
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: 4,
                marginTop: 8,
              }}
            />
          )}

          <Typography variant="caption">
            Likes: {review.likes?.length ?? 0}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <IconButton onClick={() => setIsEditing(true)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(review.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ReviewsList;
