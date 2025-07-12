import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h3>Detalles del producto</h3>
      <p>Estás viendo el producto con ID: {id}</p>
    </div>
  );
};

export default ProductDetail;