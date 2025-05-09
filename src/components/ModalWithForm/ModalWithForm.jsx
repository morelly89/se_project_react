import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isDelete,
  size = "sm",
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div
        className={`modal__content ${
          size === "lg" ? "modal__content_size_lg" : "modal__content_size_sm"
        }`}
      >
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        />{" "}
        <form
          onSubmit={onSubmit}
          className={`modal__form ${size === "lg" ? "modal__form_delete" : ""}`}
        >
          <h2 className="modal__title">{title}</h2>
          {children}
          {buttonText && (
            <button
              className="modal__submit modal__submit_delete"
              type="submit"
            >
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
