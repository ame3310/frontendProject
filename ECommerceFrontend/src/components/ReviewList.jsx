import { Box, Typography, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ReviewsList = ({ reviews, onEdit, onDelete }) => {
  if (!reviews.length) {
    return <Typography>No tienes reviews aún.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {reviews.map((r) => (
        <Paper
          key={r.id}
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1e1e2f",
            color: "#fff",
          }}>
          <Box>
            <Typography fontWeight="bold">{r.rating} estrellas</Typography>
            <Typography variant="body2">{r.comment}</Typography>
          </Box>

          <Box>
            <IconButton onClick={() => onEdit(r)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(r.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ReviewsList;
