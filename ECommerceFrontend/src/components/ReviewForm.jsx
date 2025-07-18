import React, { useState } from "react";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    formData.append("productId", productId);
    if (photo) formData.append("photo", photo);

    const res = await fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      body: formData,
    });

    const newReview = await res.json();
    onReviewAdded(newReview);
    setText("");
    setPhoto(null);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Escribe tu reseña..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <button type="submit">Enviar reseña</button>
    </form>
  );
};

export default ReviewForm;
