import avatar from "../../../assets/avatar.png";
import "./SideBar.css";
function SideBar() {
  return (
    <>
      <div className="sidebar">
        <img
          className="sidebar__avatar"
          src={avatar}
          alt="default avatar"
        ></img>
        <p className="sidebar__username">username</p>
      </div>
    </>
  );
}

export default SideBar;
