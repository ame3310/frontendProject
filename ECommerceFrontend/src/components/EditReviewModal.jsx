import { useState } from "react";

const EditReviewModal = ({ review, onSave, onCancel }) => {
  const [comment, setComment] = useState(review.comment);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar tu review</h2>
        <textarea
          className="w-full border rounded p-2 mb-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            onClick={onCancel}>
            Cancelar
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => onSave(comment)}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
