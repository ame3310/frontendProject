import { useContext, useMemo } from "react";
import { Divider, Typography, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { CartContext } from "../../context/CartContext/CartState";
import { createOrderService } from "../../services/cart.service";

import CartList from "../../components/Cart/CartList";
import CartSummary from "../../components/Cart/CartSummary";

const { Title } = Typography;

const CartPage = () => {
  const { cart, clearCart, removeFromCart, updateQuantity } =
    useContext(CartContext);

  const [messageApi, contextHolder] = message.useMessage();

  const cartListData = useMemo(
    () =>
      (cart ?? []).map((item) => ({
        id: item.id,
        title: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    [cart]
  );

  const total = useMemo(
    () =>
      (cart ?? []).reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const createNewOrder = async () => {
    try {
      await createOrderService(cart);
      clearCart();
      message.success("Pedido realizado con éxito");
    } catch (error) {
      console.error("Error creando pedido", error);
      if (error.response?.status === 401) {
        messageApi.error(
          "Oops, necesitas estar logueado para hacer pedidos.",
          10
        );
      } else {
        messageApi.error(
          "Error al realizar el pedido. Inténtalo de nuevo.",
          10
        );
      }
    }
  };

  return (
    <div className="cart-container">
      {contextHolder}

      <Divider orientation="left" className="cart-header">
        <Title level={3} style={{ margin: 0 }}>
          <ShoppingCartOutlined /> Carrito de Compras
        </Title>
      </Divider>

      <CartList
        cartData={cartListData}
        onRemove={removeFromCart}
        onQuantityChange={updateQuantity}
      />

      <CartSummary
        total={total}
        onClear={clearCart}
        onPurchase={createNewOrder}
        disabled={(cart ?? []).length === 0}
      />
    </div>
  );
};

export default CartPage;
