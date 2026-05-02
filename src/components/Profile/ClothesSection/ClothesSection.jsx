import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CreateUserContext";
import ItemCard from "../../Main/ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__text">Your items</p>
        <button onClick={handleAddClick} className="clothes-section__button">
          + Add New
        </button>
      </div>

      <ul className="clothes-section__items">
        {userClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
