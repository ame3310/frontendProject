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
import { deleteReview, updateReview } from "../../services/profile";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ProfilePage = () => {
  const { user, loadUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [expandedFavorites, setExpandedFavorites] = useState(false);

  if (!user) return <Typography>Cargando perfil...</Typography>;

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await loadUser();
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading || !user) return <Typography>Cargando perfil...</Typography>;

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      await loadUser();
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
      console.log("reviewId:", reviewId);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await updateReview(reviewId, formData);
      await loadUser();
    } catch {
      console.error("Error editando la review");
    }
  };

  const favoriteProducts =
    user.favorites?.map((product) => ({
      ...product,
      isFavorite: true,
    })) || [];

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
