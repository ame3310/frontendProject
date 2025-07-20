import { List, Space, Button } from "antd";
import CartItem from "./CartItem";

const CartList = ({
  cartData,
  onRemove,
  onQuantityChange,
  compact = false,
  onClear,
  onCheckout,
}) => {
  const isEmpty = (cartData ?? []).length === 0;

  return (
    <>
      <List
        size={compact ? "small" : "default"}
        bordered={!compact}
        dataSource={cartData}
        locale={{ emptyText: "El carrito está vacío" }}
        header={
          !compact &&
          !isEmpty && (
            <div style={{ fontWeight: "bold" }}>Productos seleccionados</div>
          )
        }
        renderItem={(item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={onRemove}
            onQuantityChange={onQuantityChange}
            compact={compact}
          />
        )}
      />

      {compact && !isEmpty && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <Space>
            <Button danger onClick={onClear}>
              Vaciar
            </Button>
            <Button type="primary" onClick={onCheckout}>
              Hacer pedido
            </Button>
          </Space>
        </div>
      )}
    </>
  );
};

export default CartList;
