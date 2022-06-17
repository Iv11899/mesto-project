import { openPopup, closePopup } from "./modal";
import { initialCards } from "./cards.js";
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
    const heartButton = photoElement.querySelector(".photo-grid__like");
    const deleteButton = photoElement.querySelector(".photo-grid__delete");
  photoElement.querySelector(".photo-grid__title").textContent = title;
  const photoImg = photoElement.querySelector(".photo-grid__img");
  photoImg.src = image;
  photoImg.alt = title;
  photoImg.addEventListener("click", function () {
    openBigImg(image, title)
  });
   // добавление лайков
function likeCard(evt) {
   evt.target.classList.toggle("photo-grid__like_active");
 }
 heartButton.addEventListener("click", likeCard);

  // Удалить карточку //
  function deleteCard(evt) {
    photoElement.remove()
}

deleteButton.addEventListener("click", deleteCard);

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
