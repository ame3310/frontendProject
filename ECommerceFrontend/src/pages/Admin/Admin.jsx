import React, { useState, useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext/AdminState';
import UsersTab from '../../components/Admin/UsersTab';
import ProductsTab from '../../components/Admin/ProductsTab';
import OrdersTab from '../../components/Admin/OrdersTab';

const AdminPanel = () => {
    const { getUsers, getOrders, getProducts } = useContext(AdminContext);
    const [activeTab, setActiveTab] = useState('products');

    useEffect(() => {
        getUsers();
        getOrders();
        getProducts();
    }, []);

    return (
        <div className="admin-panel">
        <h1 className="admin-panel__section-title">Panel Administrativo</h1>

        <nav className="admin-panel__nav">
            <button
            className={`admin-panel__nav-btn ${activeTab === 'users' ? 'admin-panel__nav-btn--active' : ''}`}
            onClick={() => setActiveTab('users')}
            >
            Usuarios
            </button>
            <button
            className={`admin-panel__nav-btn ${activeTab === 'orders' ? 'admin-panel__nav-btn--active' : ''}`}
            onClick={() => setActiveTab('orders')}
            >
            Pedidos
            </button>
            <button
            className={`admin-panel__nav-btn ${activeTab === 'products' ? 'admin-panel__nav-btn--active' : ''}`}
            onClick={() => setActiveTab('products')}
            >
            Productos
            </button>
        </nav>

        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'orders' && <OrdersTab />}
        </div>
    );
};

export default AdminPanel;
