import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
function LoginModal({ isOpen, onClose, onLogin, onRegisterClick, loginError }) {
  const [data, setData] = useState({ email: "", password: "" });

  const isFormValid = data.email.trim() && data.password.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(data);
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Log In"
    >
      <label className="modal__label">
        Email
        <input
          placeholder="Email"
          id="email"
          name="email"
          type="email"
          value={data.email}
          className="modal__input"
          onChange={handleChange}
        ></input>
      </label>
      <label className="modal__label">
        Password
        <input
          placeholder="Password"
          className="modal__input"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        ></input>
      </label>
      {loginError && <p className="modal__error">{loginError}</p>}
      <div className="modal__button-container">
        {" "}
        <button
          className={`modal__submit ${
            isFormValid ? "modal__submit_active" : "modal__submit_disabled"
          }`}
          type="submit"
          disabled={!isFormValid}
        >
          Log In
        </button>
        <button
          className="modal__switch-button"
          type="submit"
          onClick={onRegisterClick}
          type="button"
        >
          Or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}
export default LoginModal;
