const DeleteButton = ({ onClick, label = "Borrar" }) => {
  return (
    <button className="delete-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default DeleteButton;
