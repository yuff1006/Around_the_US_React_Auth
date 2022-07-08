import PopupWithForm from "./PopupWithForm";
import { useState, useRef } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, buttonState }) {
  const [pictureName, setPictureName] = useState("");
  const [pictureLink, setPictureLink] = useState("");
  const [isNameValid, setNameValid] = useState(true);
  const [isLinkValid, setLinkValid] = useState(true);
  const nameInputRef = useRef();
  const linkInputRef = useRef();
  function handlePictureNameChange(e) {
    setPictureName(e.target.value);
    if (e.target.checkValidity()) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  }
  function handlePictureLinkChange(e) {
    setPictureLink(e.target.value);
    if (e.target.checkValidity()) {
      setLinkValid(true);
    } else {
      setLinkValid(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name: pictureName, link: pictureLink });
  }
  return (
    <PopupWithForm
      name="place"
      title="New place"
      buttonText={buttonState === false ? "Create" : "Saving..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonState={buttonState}
    >
      <input
        type="text"
        className={`popup__info ${!isNameValid && "popup__info_type_error"}`}
        id="popup-place"
        placeholder="Title"
        required
        minLength="1"
        maxLength="30"
        name="name"
        value={pictureName}
        onChange={handlePictureNameChange}
        ref={nameInputRef}
      />
      <span
        className={`popup__error ${!isNameValid && "popup__error_visible"}`}
        id="popup-place-error"
      >
        {nameInputRef.current?.validationMessage}
      </span>
      <input
        className={`popup__info ${!isLinkValid && "popup__info_type_error"}`}
        id="popup-url"
        placeholder="Image Link"
        required
        type="url"
        name="link"
        value={pictureLink}
        onChange={handlePictureLinkChange}
        ref={linkInputRef}
      />
      <span
        className={`popup__error ${!isLinkValid && "popup__error_visible"}`}
        id="popup-url-error"
      >
        {linkInputRef.current?.validationMessage}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
