import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import avatar from "../../assets/avatar.png";
import CurrentUserContext from "../../contexts/CreateUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({
  handleRegisterClick,
  handleLoginClick,
  handleAddClick,
  weatherData,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="header logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate} {weatherData.city}
      </p>

      <div className="header__user-container">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>

            <Link to="/profile" className="header__profile">
              <p className="header__username">{currentUser.name}</p>
              <img
                className="header__avatar"
                src={currentUser.avatar || avatar}
                alt={currentUser.name || "User avatar"}
              />
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleRegisterClick}
              type="button"
              className="header__signup-button"
            >
              Signup
            </button>

            <button
              onClick={handleLoginClick}
              type="button"
              className="header__login-button"
            >
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
