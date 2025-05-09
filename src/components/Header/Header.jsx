import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
function Header({ handleAddClick, weatherData }) {
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
      </p>{" "}
      <div className="header__user-container">
        <ToggleSwitch></ToggleSwitch>{" "}
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>{" "}
        <Link to="/profile" className="header__profile">
          <p className="header__username">Terrance Tegegne</p>{" "}
          <img
            className="header__avatar"
            src={avatar}
            alt="Terrance Tegegne"
          ></img>
        </Link>
      </div>
    </header>
  );
}

export default Header;
