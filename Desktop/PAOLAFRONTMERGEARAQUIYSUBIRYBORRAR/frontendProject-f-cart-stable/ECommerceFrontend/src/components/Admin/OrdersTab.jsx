import React, { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext/AdminState';
import OrderList from '../OrderList'

const OrdersTab = () => {
  const { orders } = useContext(AdminContext);

  return (
    <section className="admin-panel__section">
      <h2 className="admin-panel__section-title">Pedidos</h2>
      <OrderList orders={orders} isAdmin={true}/>
    </section>
  );
};

export default OrdersTab;
