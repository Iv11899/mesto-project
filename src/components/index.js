import "../pages/index.css";
import { initCard, addNewCard, displayLikes } from "./card";
import { openPopup, closePopup, renderFormLoading } from "./modal.js";
import { enableValidation } from "./validate.js";
import {profileEdit, profileAdd, popupEdit, imgPopup, buttonsClose, formEdit, nameInput, aboutInput, 
  profileName, profileAbout, formElementImage, placeNameInput, placeLinkInput, photoGrid, profileAvatar, editAvatarButton, avatarPopup, avatarLink, profileAvatarForm, userId, editAvatarDot, editProfileDot} from "./constants.js";
import {getUserData, getInitialCards, editUserData, changeAvatar, addCard, deleteCard, addLike, deleteLike } from './api.js'


  Promise.all([getUserData(), getInitialCards()])
  .then(([data, cards]) => {
    profileAvatar.src = data.avatar;
    profileName.textContent = data.name;
    profileAbout.textContent = data.about;
    userId.id = data._id
    cards.forEach((card) => {
      photoGrid.append(initCard(card));
    })
    console.log(cards)
  })
  .catch(err => {
    console.log(err);
  });

  editAvatarButton.addEventListener("click", function () {
    openPopup(avatarPopup);
  });
  profileAvatarForm.addEventListener("submit", handleProfileAvatarSubmit)

  // function handleProfileFormSubmit(evt) {
  //   renderLoading(true, editButtonSave)
  //     evt.preventDefault()}
  
  function handleProfileAvatarSubmit(evt) {
    renderFormLoading(true, editAvatarDot)
    evt.preventDefault();
    changeAvatar(avatarLink.value)
    .then (res => {
      console.log(res)
      profileAvatar.src = avatarLink.value;
          closePopup(avatarPopup)
        })
        .catch((err) => {
          console.log(err.message)
        })
        }
        

// Открыть попап c редактированием //
profileEdit.addEventListener("click", function () {
  initInfo();
  openPopup(popupEdit);
});

//Открыть попап добавления картинки //
profileAdd.addEventListener("click", function () {
  openPopup(imgPopup);
});

buttonsClose.forEach(function (close) {
  close.addEventListener("click", function () {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  });
});

// Установить начальные значения профиля редактирования //
function  initInfo() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

// Обновить информацию в профиле //
function editProfileInfo(evt) {
  renderFormLoading(true, editProfileDot)
  evt.preventDefault();
  editUserData ( nameInput.value, aboutInput.value )
  .then (res => {
  profileName.textContent = res.name;
  aboutInput.value = res.about;
  closePopup(popupEdit)})

  .catch((err) => {
    console.log(err.message)
  })
}

// Удалить карточку //
export function deleteAddedCard(button, card, cardId) {
  button.addEventListener('click', () => {
    deleteCard(cardId)
    .then(() => {
      card.remove()
    })
  })
}

export function addALike(button, cardId, likeCounter) {
  button.addEventListener('click', () => {
    if(button.classList.contains('photo-grid__like_active')) {
      deleteLike(cardId)
      .then((res) => {
        button.classList.remove('photo-grid__like_active');
        displayLikes(likeCounter, res);
      })
      .catch((err) => {
        console.log(err);
      })} 
      else {
        addLike(cardId)
        .then((res) => {
          button.classList.add('photo-grid__like_active');
          displayLikes(likeCounter, res);
        })
      };
  })
}

// Создать карточку //
function submitCardForm(evt) {
  addCard(placeNameInput.value, placeLinkInput.value)
  .then((res) => {
  addNewCard(res);
  closePopup(imgPopup);
  renderCard(res.link, res.name);
  placeNameInput.value = "";
  placeLinkInput.value = "";
  })
  const btn = imgPopup.querySelector('.popup__submit');
  btn.disabled = true;
  btn.classList.add('popup__submit_disabled');
}

// Добавить карточку //
function renderCard(image, title) {
  const card = initCard(image, title);
  photoGrid.append(card);
}

formEdit.addEventListener("submit", editProfileInfo);

formElementImage.addEventListener("submit", submitCardForm);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputErrorClass: "popup__input-error",
  errorClass: ".popup__input-error_active",
});
