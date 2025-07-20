import React, { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext/AdminState';

const OrdersTab = () => {
  const { orders } = useContext(AdminContext);

  return (
    <section className="admin-panel__section">
      <h2 className="admin-panel__section-title">Pedidos</h2>
      <pre className="admin-panel__json">{JSON.stringify(orders, null, 2)}</pre>
    </section>
  );
};

export default OrdersTab;
