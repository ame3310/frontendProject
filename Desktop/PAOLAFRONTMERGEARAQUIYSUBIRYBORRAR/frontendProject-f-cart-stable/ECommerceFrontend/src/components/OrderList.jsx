import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductCard from "./ProductCard";

const OrdersList = ({ orders, isAdmin = false }) => {
  if (!orders.length) return <Typography>No tienes pedidos aún.</Typography>;

  return orders.map((order) => (
    <Accordion key={order.id}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Pedido #{order.id} </Typography>
        {isAdmin && (
        <Typography variant="subtitle2" color="text.secondary">
          Realizado por: {order.user?.userName || "Usuario desconocido"}
        </Typography>  
        )}
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={2}>
          {order.products.map((product) => {
            const quantity = product.OrderProduct?.quantity || 1;
            const subtotal = (product.price * quantity).toFixed(2);

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} width={220} height={160} />
                <Typography variant="body2">Unidades: {quantity}</Typography>
                <Typography variant="body2">Subtotal: {subtotal} €</Typography>
              </Grid>
            );
          })}
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight="bold">
          Total del pedido: {calculateOrderTotal(order)} €
        </Typography>
      </AccordionDetails>
    </Accordion>
  ));
};

const calculateOrderTotal = (order) => {
  return order.products
    .reduce((total, p) => {
      const quantity = p.OrderProduct?.quantity || 1;
      return total + p.price * quantity;
    }, 0)
    .toFixed(2);
};

export default OrdersList;