import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CreateUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onEditProfile({
      name,
      avatar,
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonClassName="modal__submit_type_edit-profile"
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          id="profile-name"
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          id="profile-avatar"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
