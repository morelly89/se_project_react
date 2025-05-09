import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, onDeleteClick }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close-button" onClick={onClose}>
          {" "}
        </button>
        <img
          src={card.imageUrl}
          alt="modal image"
          className="modal__image"
        ></img>

        <div className="modal__footer">
          <div className="footer__container">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>{" "}
          </div>

          <button onClick={onDeleteClick} className="modal__delete-button">
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
