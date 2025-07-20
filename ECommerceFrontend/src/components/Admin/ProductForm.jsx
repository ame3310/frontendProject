import React, { useState, useEffect } from 'react';

const ProductForm = ({ product = null, categories = [], onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryIds: [],
    });

    const [currentImages, setCurrentImages] = useState([]);
    const [imagesToRemove, setImagesToRemove] = useState([]);
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        if (product) {
        setFormData({
            name: product.name || '',
            description: product.description || '',
            price: product.price || '',
            categoryIds: product.categories?.map(c => Number(c.id)) || [],
        });
        setCurrentImages(product.images || []);
        } else {
        setFormData({ name: '', description: '', price: '', categoryIds: [] });
        setCurrentImages([]);
        setImagesToRemove([]);
        setNewImages([]);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleCategory = (id) => {
        const numericId = Number(id); 
        setFormData(prev => {
        const exists = prev.categoryIds.includes(numericId);
        return {
            ...prev,
            categoryIds: exists
            ? prev.categoryIds.filter(cid => cid !== numericId)
            : [...prev.categoryIds, numericId],
        };
        });
    };

    const toggleRemoveImage = (img) => {
        setImagesToRemove(prev =>
        prev.includes(img) ? prev.filter(i => i !== img) : [...prev, img]
        );
    };

    const handleNewImagesChange = (e) => {
        setNewImages(Array.from(e.target.files));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        formData.categoryIds.forEach((id) => {
        data.append("categoryIds[]", id);
        });

        newImages.forEach((file) => data.append('images', file));
        data.append('removeImages', JSON.stringify(imagesToRemove));
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
        <label>
            Nombre:
            <input name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
            Descripción:
            <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>

        <label>
            Precio:
            <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            />
        </label>

        <fieldset>
            <legend>Categorías:</legend>
            {categories.map(cat => (
            <label key={cat.id}>
                <input
                type="checkbox"
                checked={formData.categoryIds.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                />
                {cat.name}
            </label>
            ))}
        </fieldset>

        {product && (
            <fieldset>
            <legend>Imágenes actuales:</legend>
            {currentImages.length === 0 && <p>No hay imágenes</p>}
            {currentImages.map(img => (
                <label key={img} style={{ display: 'block' }}>
                <input
                    type="checkbox"
                    checked={imagesToRemove.includes(img)}
                    onChange={() => toggleRemoveImage(img)}
                />
                {img} (marcar para eliminar)
                </label>
            ))}
            </fieldset>
        )}

        <label>
            Añadir nuevas imágenes:
            <input type="file" multiple accept="image/*" onChange={handleNewImagesChange} />
        </label>

        <button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : product ? 'Actualizar producto' : 'Crear producto'}
        </button>
        </form>
    );
};

export default ProductForm;
