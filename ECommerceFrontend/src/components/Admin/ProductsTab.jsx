import React, { useState, useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext/AdminState';
import { Modal } from 'antd'
import ProductForm from './ProductForm';
import { createCategory } from '../../services/categories';

const ProductsTab = () => {
    const { products, updateProduct, addProduct, getProducts, categories, getCategories, deleteProduct } = useContext(AdminContext);
    const [modalOpen, setModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    const openNewProductModal = () => {
        setEditingProduct(null);
        setModalOpen(true);
    };

    const openEditProductModal = (product) => {
        setEditingProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (formData) => {
        setLoading(true);

        if (editingProduct) {
            await updateProduct(editingProduct.id, formData); 
            setSuccessMessage('Producto actualizado con éxito');
        } else {
            await addProduct(formData);
            setSuccessMessage('Producto añadido con éxito');
        }

        await getProducts();
        setLoading(false);
        closeModal();
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <section className="admin-panel__section">
            <h2 className="admin-panel__section-title">Productos</h2>

            <button className="admin-panel__btn admin-panel__btn--add" onClick={openNewProductModal}>
                Añadir Producto
            </button>

            <table className="admin-panel__table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products.map(p => (
                    <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.price.toFixed(2)}</td>
                    <td>
                        <button className="admin-panel__btn" onClick={() => openEditProductModal(p)}>
                        Editar
                        </button>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
            <Modal
                    open={modalOpen}
                    onCancel={closeModal}
                    footer={null}
                    destroyOnHidden={true}
                    width={600} 
                >
                    <ProductForm
                    product={editingProduct}
                    categories={categories}
                    loading={loading}
                    onSubmit={handleSubmit}                   
                    createCategory={createCategory}
                    onDelete={deleteProduct}
                    />
                </Modal>
        </section>
    );
};

export default ProductsTab;