import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import allProductsData from "../data/productsData.jsx";
import "../styles/pages/ProductDetail.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const product = allProductsData.find((p) => p.id === productId);

  const localStorageKey = `reviews-product-${productId}`;
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const savedReviews = localStorage.getItem(localStorageKey);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [localStorageKey]);

  const handleAddReview = async () => {
    if (newReviewText.trim() === "") return alert("Escribe una review");

    let imageBase64 = null;
    if (imageFile) {
      imageBase64 = await convertToBase64(imageFile);
    }

    const newReview = {
      id: Date.now(),
      text: newReviewText,
      date: new Date().toLocaleString(),
      image: imageBase64,
      likes: 0,
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedReviews));

    setNewReviewText("");
    setImageFile(null);
  };

  const handleLikeReview = (reviewId) => {
    const updatedReviews = reviews.map((review) =>
      review.id === reviewId
        ? { ...review, likes: (review.likes || 0) + 1 }
        : review
    );
    setReviews(updatedReviews);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedReviews));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-detail">
      <div className="product-card">
        <img src={product.image} alt={product.name} />
        <div className="details">
          <h2>{product.name}</h2>
          <p>
            <strong>Categoría:</strong> {product.category}
          </p>
          <p className="price">
            <strong>Precio:</strong> ${product.price}
          </p>
        </div>
      </div>

      <div className="review-section">
        <h3>Añadir una review</h3>
        <textarea
          rows={4}
          placeholder="Escribe tu review aquí..."
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />
        <button onClick={handleAddReview}>Añadir review</button>

        <div className="reviews">
          <h4>Reviews</h4>
          {reviews.length === 0 ? (
            <p>No hay reviews para este producto.</p>
          ) : (
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <p>{review.text}</p>
                  <span>{review.date}</span>
                  {review.image && (
                    <img
                      src={review.image}
                      alt="imagen de review"
                      style={{
                        marginTop: "0.5rem",
                        maxWidth: "200px",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <div className="review-actions">
                    <button onClick={() => handleLikeReview(review.id)}>
                      ❤️ {review.likes || 0}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
