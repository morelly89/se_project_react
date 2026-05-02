import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  size = "sm",
  className,
  submitButtonClassName = "",
  isFormValid = true,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div
        className={`modal__content ${
          size === "lg" ? "modal__content_size_lg" : "modal__content_size_sm"
        } ${className || ""}`}
      >
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        />{" "}
        <form onSubmit={onSubmit} className="modal__form">
          <h2 className="modal__title">{title}</h2>
          {children}
          {buttonText && (
            <button
              className={`modal__submit ${submitButtonClassName} ${
                isFormValid ? "modal__submit_active" : "modal__submit_disabled"
              }`}
              type="submit"
              disabled={!isFormValid}
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
