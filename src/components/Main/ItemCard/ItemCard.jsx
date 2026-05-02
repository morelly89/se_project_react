import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CreateUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser._id);

  const handleLike = (e) => {
    e.stopPropagation();

    onCardLike({
      _id: item._id,
      isLiked,
    });
  };

  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__name">{item.name}</h2>

        <button
          type="button"
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          onClick={handleLike}
        ></button>
      </div>
      <img
        onClick={() => {
          onCardClick(item);
        }}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
