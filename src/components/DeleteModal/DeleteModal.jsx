import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./DeleteModal.css";

function DeleteModal({ isOpen, onClose, onDelete }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      onSubmit={onDelete}
      onClose={onClose}
      size="lg"
      className="modal__content_type_delete"
    >
      <p className="modal__delete-title">
        Are you sure you want to delete this item? This action is irreversible.
      </p>

      <div className="modal__delete-button-container">
        <button className="modal__submit_delete" type="submit">
          Yes, delete
        </button>

        <button
          onClick={onClose}
          className="modal__cancel-button"
          type="button"
        >
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
}

export default DeleteModal;
