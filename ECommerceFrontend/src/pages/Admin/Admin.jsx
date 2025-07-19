import React, { useState, useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext/AdminState'
import './adminpanel.scss'

const AdminPanel = () => {
    const { users, orders, products, getUsers, getOrders, getProducts, updateUser, updateProduct, addProduct } = useContext(AdminContext);
    const [activeTab, setActiveTab] = useState('products');
    const [newProductData, setNewProductData] = useState({ name: '', price: '' });
    const [editProductId, setEditProductId] = useState(null);
    const [editProductData, setEditProductData] = useState({});

    useEffect(() => {
        getUsers();
        getOrders();
        getProducts();
    }, []);

    const startEditingProduct = (product) => {
        setEditProductId(product.id);
        setEditProductData({ name: product.name, price: product.price });
    };

    const cancelEditing = () => {
        setEditProductId(null);
        setEditProductData({});
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setEditProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProductData(prev => ({ ...prev, [name]: value }));
    };

    const submitNewProduct = () => {
        if(!newProductData.name || !newProductData.price) {
            alert("Por favor rellena todos los campos");
            return;
        }
        addProduct({
            name: newProductData.name,
            price: Number(newProductData.price),
        });
        setNewProductData({ name: '', price: '' });
    };

    const saveProduct = () => {
        updateProduct(editProductId, {
        ...editProductData,
        price: Number(editProductData.price)
        });
        cancelEditing();
    };

    return (
        <div className="admin-panel">
        <h1 className="admin-panel__section-title">Panel Administrativo</h1>

        <nav className="admin-panel__nav">
            <button
            className={`admin-panel__nav-btn ${
                activeTab === "users" ? "admin-panel__nav-btn--active" : ""
            }`}
            onClick={() => setActiveTab("users")}
            >
            Usuarios
            </button>
            <button
            className={`admin-panel__nav-btn ${
                activeTab === "orders" ? "admin-panel__nav-btn--active" : ""
            }`}
            onClick={() => setActiveTab("orders")}
            >
            Pedidos
            </button>
            <button
            className={`admin-panel__nav-btn ${
                activeTab === "products" ? "admin-panel__nav-btn--active" : ""
            }`}
            onClick={() => setActiveTab("products")}
            >
            Productos
            </button>
        </nav>

        {activeTab === "products" && (
            <section className="admin-panel__section">
            <h2 className="admin-panel__section-title">Productos</h2>
            <table className="admin-panel__table">
                <thead>
                <tr className="admin-panel__table-row">
                    <th className="admin-panel__table-head">Nombre</th>
                    <th className="admin-panel__table-head">Precio</th>
                    <th className="admin-panel__table-head">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr
                    className="admin-panel__table-row"
                    key={product.id}
                    >
                    <td className="admin-panel__table-data">
                        {editProductId === product.id ? (
                        <input
                            className="admin-panel__input"
                            name="name"
                            value={editProductData.name}
                            onChange={handleProductChange}
                        />
                        ) : (
                        product.name
                        )}
                    </td>
                    <td className="admin-panel__table-data">
                        {editProductId === product.id ? (
                        <input
                            className="admin-panel__input"
                            name="price"
                            type="number"
                            value={editProductData.price}
                            onChange={handleProductChange}
                        />
                        ) : (
                        product.price.toFixed(2)
                        )}
                    </td>
                    <td className="admin-panel__table-data">
                        {editProductId === product.id ? (
                        <>
                            <button
                            className="admin-panel__btn admin-panel__btn--save"
                            onClick={saveProduct}
                            >
                            Guardar
                            </button>
                            <button
                            className="admin-panel__btn admin-panel__btn--cancel"
                            onClick={cancelEditing}
                            >
                            Cancelar
                            </button>
                        </>
                        ) : (
                        <button
                            className="admin-panel__btn"
                            onClick={() => startEditingProduct(product)}
                        >
                            Editar
                        </button>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="admin-panel__new-product">
                <input
                className="admin-panel__input"
                name="name"
                placeholder="Nombre nuevo producto"
                value={newProductData.name}
                onChange={handleNewProductChange}
                />
                <input
                className="admin-panel__input"
                name="price"
                type="number"
                placeholder="Precio"
                value={newProductData.price}
                onChange={handleNewProductChange}
                />
                <button
                className="admin-panel__btn admin-panel__btn--add"
                onClick={submitNewProduct}
                >
                Añadir Producto
                </button>
            </div>
            </section>
        )}

        {activeTab === "users" && (
            <section className="admin-panel__section">
            <h2 className="admin-panel__section-title">Usuarios</h2>
            <pre className="admin-panel__json">{JSON.stringify(users, null, 2)}</pre>
            </section>
        )}

        {activeTab === "orders" && (
            <section className="admin-panel__section">
            <h2 className="admin-panel__section-title">Pedidos</h2>
            <pre className="admin-panel__json">{JSON.stringify(orders, null, 2)}</pre>
            </section>
        )}
        </div>
    );
};

export default AdminPanel;