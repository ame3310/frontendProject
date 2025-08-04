import React, { useState, useEffect } from "react";
import Select from "react-select";

const ProductForm = ({
  product = null,
  categories = [],
  onSubmit,
  loading,
  createCategory,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryIds: [],
  });

  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [localCategories, setLocalCategories] = useState(categories);
  const [currentImages, setCurrentImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

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
const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const newCat = await createCategory({ name: newCategoryName.trim() });
      const newOption = { value: newCat.id, label: newCat.name };
      setLocalCategories((prev) => [...prev, newOption]);
      setFormData((prev) => ({
        ...prev,
        categoryIds: [...prev.categoryIds, newOption],
      }));
      setNewCategoryName("");
      setAddingCategory(false);
    } catch (error) {
      alert("Error creando categoría");
      console.error(error);
    }
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

  const categoryOptions = localCategories;

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
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Select
          isMulti
          options={categoryOptions}
          value={formData.categoryIds}
          onChange={handleCategorySelect}
          placeholder="Selecciona una o más categorías"
          styles={{ container: (base) => ({ ...base, flex: 1 }) }}
        />
        <button
            type="button"
            onClick={() => setAddingCategory((v) => !v)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {addingCategory ? "Cancelar" : "Añadir"}
          </button>
        </div>
      </label>
      {addingCategory && (
              <div style={{ marginTop: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="Nombre nueva categoría"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  style={{ padding: "0.5rem", width: "70%" }}
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  style={{
                    padding: "0.5rem 1rem",
                    marginLeft: "0.5rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Guardar
                </button>
              </div>
            )}

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
