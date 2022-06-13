const page = document.querySelector('.page');

// Закрыть попап по ESC //
function popupOpened(popup) {
    popup.classList.add("popup_opened");
    page.addEventListener('keydown', closeEsc);
  }
  
  function popupClose(popup) {
    popup.classList.remove("popup_opened");
    page.removeEventListener('keydown', closeEsc);
  }

  function closeEsc(evt) {
    if (evt.key === "Escape") {
      const popupOpened = page.querySelector(".popup_opened");
      popupOpened && popupClose(popupOpened);
    }
  }

  // Закрыть попапы по клику на оверлей //
page.addEventListener('mousedown', function(evt) {
    if (evt.target.classList.contains('popup')) {
      popupClose(evt.target);
    };
  });
  
  export {popupOpened, popupClose}