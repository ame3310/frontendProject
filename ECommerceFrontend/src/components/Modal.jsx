const Modal = ({ children, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 1000,
      }}
      onClick={onClose} 
    >
      <div
        style={{ background: 'white', padding: 20, borderRadius: 5, minWidth: 300 }}
        onClick={e => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>
  );
};