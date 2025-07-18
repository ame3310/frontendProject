import { useAuth } from "../context/AuthContext";
import { Container, Typography, Avatar, Divider } from "@mui/material";
import OrdersList from "../components/OrderList";
import ReviewsList from "../components/ReviewList";
import { deleteReview, updateReview } from "../services/profile";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ProfilePage = () => {
  const { user, loadUser } = useAuth();

  if (!user) return <Typography>Cargando perfil...</Typography>;

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      await loadUser();
    } catch {
      console.error("Error al borrar la review");
    }
  };

  const handleEditReview = async (review) => {
    const newComment = prompt("Edita tu review:", review.comment);
    if (newComment && newComment !== review.comment) {
      try {
        await updateReview(review.id, newComment);
        await loadUser();
      } catch {
        console.error("Error editando la review");
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom>
        Perfil de {user.userName}
      </Typography>

      <Avatar
        alt="Avatar"
        src={
          user.avatar
            ? `${BACKEND_URL}/uploads/${user.avatar}`
            : "/default-avatar.png"
        }
        sx={{ width: 120, height: 120, marginBottom: 2 }}
      />

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h5" gutterBottom>
        Mis pedidos
      </Typography>
      <OrdersList orders={user.orders || []} />

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h5" gutterBottom>
        Mis reviews
      </Typography>
      <ReviewsList
        reviews={user.reviews || []}
        onEdit={handleEditReview}
        onDelete={handleDeleteReview}
      />
    </Container>
  );
};
