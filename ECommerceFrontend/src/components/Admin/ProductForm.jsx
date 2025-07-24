import React, { useState, useEffect } from "react";
import Select from "react-select";

const ProductForm = ({
  product = null,
  categories = [],
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryIds: [],
  });

  const [currentImages, setCurrentImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        categoryIds:
          product.categories?.map((c) => ({
            value: c.id,
            label: c.name,
          })) || [],
      });
      setCurrentImages(product.images || []);
    } else {
      setFormData({ name: "", description: "", price: "", categoryIds: [] });
      setCurrentImages([]);
      setImagesToRemove([]);
      setNewImages([]);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (selectedOptions) => {
    setFormData((prev) => ({ ...prev, categoryIds: selectedOptions || [] }));
  };

  const toggleRemoveImage = (img) => {
    setImagesToRemove((prev) =>
      prev.includes(img) ? prev.filter((i) => i !== img) : [...prev, img]
    );
  };

  const handleNewImagesChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);

    formData.categoryIds.forEach((cat) => {
      data.append("categoryIds[]", cat.value);
    });

    newImages.forEach((file) => data.append("images", file));
    data.append("removeImages", JSON.stringify(imagesToRemove));
    onSubmit(data);
  };

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Descripción:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
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

      <label>
        Categorías:
        <Select
          isMulti
          options={categoryOptions}
          value={formData.categoryIds}
          onChange={handleCategorySelect}
          placeholder="Selecciona una o más categorías"
        />
      </label>

      {product && currentImages.length > 0 && (
        <fieldset>
          <legend>Imágenes actuales:</legend>
          {currentImages.map((img) => (
            <label key={img} style={{ display: "block" }}>
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
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleNewImagesChange}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading
          ? "Guardando..."
          : product
          ? "Actualizar producto"
          : "Crear producto"}
      </button>
    </form>
  );
};

export default ProductForm;
