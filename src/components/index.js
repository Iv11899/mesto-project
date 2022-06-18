import "../pages/index.css";
import { initCard } from "./card";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation } from "./validate.js";
import { initialCards } from "./cards.js";

const profileEdit = document.querySelector(".profile__edit");
const profileAdd = document.querySelector(".profile__add");
const popupEdit = document.querySelector(".popup_edit");
const imgPopup = document.querySelector(".popup_image");
const buttonsClose = document.querySelectorAll(".popup__close");
const formEdit = popupEdit.querySelector(".popup__form");
const nameInput = formEdit.querySelector(".popup__input_type_name");
const aboutInput = formEdit.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const formElementImage = document.querySelector(".popup-image__form");



const placeNameInput = document.querySelector(".popup__input_place-name");
const placeLinkInput = document.querySelector(".popup__input_place-link");
const photoGrid = document.querySelector(".photo-grid");

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
function initInfo() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

// Обновить информацию в профиле //
function editProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEdit);
}

// Создать карточку //
function submitCardForm(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  closePopup(imgPopup);
  renderCard(link, name);
  placeNameInput.value = "";
  placeLinkInput.value = "";
  const btn = imgPopup.querySelector('.popup__submit');
  btn.disabled = true;
  btn.classList.add('popup__submit_disabled');
}

// Добавить карточку //
function renderCard(image, title) {
  const card = initCard(image, title);
  photoGrid.prepend(card);
}


initialCards.forEach((element) => {
  renderCard(element.link, element.name);
});




formEdit.addEventListener("submit", editProfileInfo);

formElementImage.addEventListener("submit", submitCardForm);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputErrorClass: "popup__input-error",
  errorClass: ".popup__input-error_active",
});
