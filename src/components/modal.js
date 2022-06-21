import {page} from './constants.js'

  

function openPopup(popup) {
    popup.classList.add("popup_opened");
    page.addEventListener('keydown', closeEsc);
    page.addEventListener('mousedown', clickOver);
  }
  
  function closePopup(popup) {
    popup.classList.remove("popup_opened");
    page.removeEventListener('keydown', closeEsc);
    page.removeEventListener('mousedown', clickOver);
  }
// Закрыть попап по ESC //
  function closeEsc(evt) {
    if (evt.key === "Escape") {
      const openPopup = page.querySelector(".popup_opened");
      openPopup && closePopup(openPopup);
    }
  }
 // Закрыть попапы по клику на оверлей //
  function clickOver(evt) {
    if (evt.target.classList.contains('popup')) {
      const openPopup = page.querySelector(".popup_opened");
      openPopup && closePopup(openPopup);
    }
  }

  const renderFormLoading = (isLoading, submitButton) => {
    if(isLoading) {
      submitButton.textContent = 'Coхранение...'
    } else {
      submitButton.textContent = 'Сохранить'
    }
  }
  
  export {openPopup, closePopup, renderFormLoading }