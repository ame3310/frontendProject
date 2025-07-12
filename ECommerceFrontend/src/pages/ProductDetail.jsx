import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Detalle del Producto</h3>
      <p>Mostrando detalles del producto con ID: {id}</p>
    </div>
  );
};

export default ProductDetail;
