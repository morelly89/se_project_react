import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
function Profile({ onCardClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar></SideBar>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
        ></ClothesSection>
      </section>
    </div>
  );
}

export default Profile;
