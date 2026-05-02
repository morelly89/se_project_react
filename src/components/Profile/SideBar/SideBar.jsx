import { useContext } from "react";
import avatar from "../../../assets/avatar.png";
import CurrentUserContext from "../../../contexts/CreateUserContext";
import "./SideBar.css";
function SideBar({ onSignOut, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar || avatar}
          alt={currentUser.name || "default avatar"}
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__user-action">
        <button
          type="button"
          className="sidebar__edit-button"
          onClick={onEditProfile}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__signout-button"
          onClick={onSignOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
