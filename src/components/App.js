import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardConfirmationPopup from "./DeleteCardConfirmationPopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import { DeletedCardContext } from "../contexts/DeletedCardContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [
    isDeleteCardConfirmationPopupOpen,
    setDeleteCardConfirmationPopupOpen,
  ] = useState(false);
  const [isPicturePopupOpen, setPicturePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState({});
  const [isButtonStateLoading, setButtonStateLoading] = useState(false);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keyup", handleEscClose);
    return () => {
      document.removeEventListener("keyup", handleEscClose);
    };
  }, []);
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setPicturePopupOpen(false);
    setDeleteCardConfirmationPopupOpen(false);
    setSelectedCard({});
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setPicturePopupOpen(true);
  }
  function handleUpdateUser(inputValues) {
    setButtonStateLoading(true);
    api
      .editUserProfile(inputValues)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonStateLoading(false);
      });
  }
  function handleUpdateAvatar(avatar) {
    setButtonStateLoading(true);
    api
      .editProfilePic(avatar)
      .then((updatedInfo) => {
        setCurrentUser(updatedInfo);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonStateLoading(false);
      });
  }
  function handleLikeClick(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    setButtonStateLoading(true);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        // loop over all the currentCards stored in the state and find the card that has been liked/disliked and change the data of that card
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonStateLoading(false);
      });
  }

  function handleConfirmation(deletedCard) {
    setDeleteCardConfirmationPopupOpen(true);
    setDeletedCard(deletedCard);
  }

  function handleCardDelete(card) {
    setButtonStateLoading(true);
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        )
      )
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonStateLoading(false);
      });
  }
  function handleAddPlaceSubmit(card) {
    setButtonStateLoading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonStateLoading(false);
      });
  }
  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <CardsContext.Provider value={cards}>
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleLikeClick}
              onCardDelete={handleConfirmation}
            />
          </CardsContext.Provider>
          <Footer />
          <ImagePopup
            name="picture"
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isPicturePopupOpen}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonState={isButtonStateLoading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonState={isButtonStateLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            buttonState={isButtonStateLoading}
          />
          <DeletedCardContext.Provider value={deletedCard}>
            <DeleteCardConfirmationPopup
              isOpen={isDeleteCardConfirmationPopupOpen}
              onClose={closeAllPopups}
              onConfirmation={handleCardDelete}
              buttonState={isButtonStateLoading}
            />
          </DeletedCardContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
