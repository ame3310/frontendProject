import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import {
  Container,
  Typography,
  Avatar,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrdersList from "../../components/OrderList";
import ReviewsList from "../../components/ReviewList";
import ProductCard from "../../components/ProductCard";
import { getAllReviewsByUser } from "../../services/reviews";
import { deleteReview, updateReview } from "../../services/profile";
import ProfileUpdateForm from "../../components/Profile/ProfileUpdateForm";
import './profile.scss';

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_STATIC_URL || "http://localhost:3000";

export const ProfilePage = () => {
  const { user, loadUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [expandedFavorites, setExpandedFavorites] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  const fetchUserReviews = async () => {
    try {
      const res = await getAllReviewsByUser();
      setUserReviews(res.data);
    } catch {
      console.error("Error al obtener reviews del usuario");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await loadUser();
      await fetchUserReviews();
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      await fetchUserReviews();
    } catch {
      console.error("Error al borrar la review");
    }
  };

  const handleEditReview = async (reviewId, updatedReview) => {
    try {
      const { rating, comment, imageFile, removeImage } = updatedReview;

      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (removeImage) {
        formData.append("removeImage", "true");
      }

      await updateReview(reviewId, formData);
      await fetchUserReviews();
    } catch {
      console.error("Error editando la review");
    }
  };

  const favoriteProducts = user?.favorites || [];

  if (loading || !user) return <Typography>Cargando perfil...</Typography>;

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

      <ProfileUpdateForm />

      <Typography variant="h5" gutterBottom>
        Mis pedidos
      </Typography>
      <OrdersList orders={user.orders || []} />

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h5" gutterBottom>
        Mis reviews
      </Typography>
      <ReviewsList
        reviews={userReviews}
        refreshReviews={fetchUserReviews}
        onEdit={handleEditReview}
        onDelete={handleDeleteReview}
      />

      <Divider sx={{ marginY: 2 }} />

      <Accordion
        expanded={expandedFavorites}
        onChange={() => setExpandedFavorites(!expandedFavorites)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Mis favoritos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {favoriteProducts.length > 0 ? (
            <Grid container spacing={2}>
              {favoriteProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} hideAddToCart />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No tienes productos favoritos.</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
