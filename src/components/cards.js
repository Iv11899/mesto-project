import { openPopup, closePopup } from "./modal";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const imgPopup = document.querySelector(".popup_image");
const placeNameInput = document.querySelector(".popup__input_place-name");
const placeLinkInput = document.querySelector(".popup__input_place-link");
const popupbigImg = document.querySelector(".popup_bigImg");
const popupbigImgCap = document.querySelector(".popup_bigImg__capture");
const bigImg = document.querySelector(".popup_bigImg__image");
const photoTemplate = document.querySelector("#photo-item").content;
const photoGrid = document.querySelector(".photo-grid");

function openBigImg(src, title) {
  openPopup(popupbigImg);
  bigImg.src = src;
  bigImg.alt = title;
  popupbigImgCap.textContent = title;
}
// Добавить карточку //
function initCard(image, title) {
  const photoElement = photoTemplate
    .querySelector(".photo-grid__element")
    .cloneNode(true);
  photoElement.querySelector(".photo-grid__title").textContent = title;
  const photoImg = photoElement.querySelector(".photo-grid__img");
  photoImg.src = image;
  photoImg.alt = title;
  photoImg.addEventListener("click", function () {
    openBigImg(image, title);
  });
  const heart = photoElement.querySelector(".photo-grid__like");
  // добавление лайков
  heart.addEventListener("click", function () {
    heart.classList.toggle("photo-grid__like_active");
  });
  // Удалить карточку //
  const deleteButton = photoElement.querySelector(".photo-grid__delete");
  deleteButton.addEventListener("click", function () {
    photoElement.remove();
  });
  return photoElement;
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
export { submitCardForm };
