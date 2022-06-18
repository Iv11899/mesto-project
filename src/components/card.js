import { openPopup } from "./modal";

const popupbigImg = document.querySelector(".popup_bigImg");
const popupbigImgCap = document.querySelector(".popup_bigImg__capture");
const bigImg = document.querySelector(".popup_bigImg__image");
const photoTemplate = document.querySelector("#photo-item").content;

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
  const heartButton = photoElement.querySelector(".photo-grid__like");
  const deleteButton = photoElement.querySelector(".photo-grid__delete");

  heartButton.addEventListener("click", likeCard);

  deleteButton.addEventListener("click", deleteCard);

  return photoElement;
}

// Удалить карточку //
function deleteCard(evt) {
evt.target.closest(".photo-grid__element").remove()
}
// добавление лайков
function likeCard(evt) {
  evt.target.classList.toggle("photo-grid__like_active");
}

export { initCard };
