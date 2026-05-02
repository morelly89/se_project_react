import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
function Profile({
  onCardClick,
  clothingItems,
  onSignOut,
  handleAddClick,
  onEditProfile,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onSignOut={onSignOut} onEditProfile={onEditProfile}></SideBar>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onEditProfile={onEditProfile}
          onCardLike={onCardLike}
        ></ClothesSection>
      </section>
    </div>
  );
}

export default Profile;
