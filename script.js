const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const popupEdit = document.querySelector('.popup_edit')
const imgPopup = document.querySelector('.popup_image')
const buttonsClose = document.querySelectorAll('.popup__close');
const submit = document.querySelector('popup__submit');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const aboutInput = formElement.querySelector('.popup__input_type_about');
const PlacenameInput = document.querySelector('.popup__input_place-name');
const PlacelinkInput = document.querySelector('.popup__input_place-link');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupbigImg = document.querySelector('.popup_bigImg');
const photoItem = document.querySelectorAll('.photo-grid__element');
const popupbigImgCap = document.querySelector('.popup_bigImg__capture');
const bigImg = document.querySelector('.popup_bigImg__image');
const formElementImage = document.querySelector('.popup-image__form');
const photoTemplate = document.querySelector('#photo-item').content;
const photoElement = photoTemplate.querySelector('.photo-grid__element').cloneNode(true);
const photoGrid = document.querySelector('.photo-grid');

// Открыть попап //
function popupOpened(popup) {
  popup.classList.add("popup_opened");
}
// Открыть попап c редактированием //
profileEdit.addEventListener("click", function () {
  initInfo();
  popupOpened(popupEdit);
});

//Открыть попап добавления картинки //
profileAdd.addEventListener("click", function () {
  popupOpened(imgPopup);
});

// Закрыть попап //
function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

buttonsClose.forEach(function (cl) {
  cl.addEventListener("click", function () {
    const popupOpened = document.querySelector(".popup_opened");
    popupClose(popupOpened);
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
  popupClose(popupEdit);
}

formElement.addEventListener("submit", editProfileInfo);

function openBigImg(src, title) {
  popupOpened(popupbigImg);
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
    openBigImg(image, title)
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
function createCard(evt) {
  evt.preventDefault();
  const name = PlacenameInput.value;
  const link = PlacelinkInput.value;
  popupClose(imgPopup);
  renderCard(link, name);
  PlacenameInput.value = "";
  PlacelinkInput.value = "";
}

// Добавить карточку //
function renderCard(image, title) {
  const card = initCard(image, title);
  photoGrid.prepend(card);
}

formElementImage.addEventListener("submit", createCard);

initialCards.forEach((element) => {
  renderCard(element.link, element.name);
}); 