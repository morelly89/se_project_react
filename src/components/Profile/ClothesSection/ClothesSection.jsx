import { defaultClothingItems } from "../../../utils/Constants";
import ItemCard from "../../Main/ItemCard/ItemCard";
import "./ClothesSection.css";
function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <>
      <div className="clothes-section">
        <div className="clothes-section__container">
          <p className="clothes-section__text">your items</p>
          <button onClick={handleAddClick} className="clothes-section__button">
            + Add New
          </button>
        </div>

        <ul className="clothes-section__items">
          {clothingItems.map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ClothesSection;
