import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";

//DECIRLE A PAOLA QUE SE PUEDE PASAR EL TAMAÑO POR PROPS
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProductCard = ({ product, width = 250, height = 180 }) => {
  const imageUrl = product.images?.length
    ? `${BACKEND_URL}/uploads/${product.images[0]}`
    : "/default-product.png";

  return (
    <Card sx={{ width, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={product.name || "Producto"}
        sx={{
          height,
          objectFit: "contain",
          background: "#f9f9f9",
        }}
      />

      <CardContent>
        <Typography variant="h6" gutterBottom noWrap>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap>
          {product.description}
        </Typography>

        <Typography variant="subtitle1" color="primary" sx={{ marginTop: 1 }}>
          {product.price} €
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            marginTop: 1,
          }}>
          {product.categories?.length ? (
            product.categories.map((c) => (
              <Chip key={c.id} label={c.name} size="small" color="primary" />
            ))
          ) : (
            <Chip label="Sin categoría" size="small" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
