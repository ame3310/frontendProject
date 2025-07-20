import { Button, Space, Typography } from "antd";

const { Title } = Typography;

const CartSummary = ({ total, onClear, onPurchase, disabled }) => {
  return (
    <div className="cart-footer">
      <div className="cart-total">
        <Title level={4} style={{ margin: 0 }}>
          Total: {total.toFixed(2)}€
        </Title>
      </div>
      <div className="cart-actions">
        <Space>
          <Button danger onClick={onClear} disabled={disabled}>
            Vaciar
          </Button>
          <Button type="primary" onClick={onPurchase} disabled={disabled}>
            Comprar
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default CartSummary;
