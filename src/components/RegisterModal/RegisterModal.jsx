import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onLoginClick,
  registerError,
}) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const isFormValid =
    data.email.trim() &&
    data.password.trim() &&
    data.name.trim() &&
    data.avatar.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(data);
  };

  return (
    <ModalWithForm
      className={"modal__content_type_register"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign Up"
      isFormValid={isFormValid}
    >
      {" "}
      <label className="modal__label">
        Email *
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className="modal__input"
        ></input>
        {registerError && <p className="modal__error">{registerError}</p>}
      </label>
      <label className="modal__label">
        Password *
        <input
          className="modal__input"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        ></input>
      </label>
      <label className="modal__label">
        Name *
        <input
          className="modal__input"
          id="name"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
        ></input>
      </label>
      <label className="modal__label">
        Avatar URL *
        <input
          className="modal__input"
          id="url"
          name="avatar"
          type="url"
          value={data.avatar}
          onChange={handleChange}
        ></input>
      </label>
      <div className="modal__button-container">
        {" "}
        <button
          className={`modal__submit ${
            isFormValid ? "modal__submit_active" : "modal__submit_disabled"
          }`}
          type="submit"
          disabled={!isFormValid}
        >
          Sign Up
        </button>
        <button
          className="modal__switch-button"
          type="button"
          onClick={onLoginClick}
        >
          Or Login
        </button>
      </div>
    </ModalWithForm>
  );
}
export default RegisterModal;
