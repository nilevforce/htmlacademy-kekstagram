import { openModal, closeModal } from './modals.js';
import { validateUploadPictureForm } from './validators.js';
import { uploadPicture } from './api.js';
import { showPopupSuccess, showPopupError } from './popups.js';
import { initEffects, resetEffects } from './effects.js';

const rootElement = document.querySelector('.img-upload');
const overlayElement = rootElement.querySelector('.img-upload__overlay');
const closeButtonElement = rootElement.querySelector('.img-upload__cancel');
const uploadFormElement = rootElement.querySelector('.img-upload__form');
const submitButtonElement = rootElement.querySelector('.img-upload__submit');

const resetEditor = () => {
  resetEffects();
  uploadFormElement.reset();
};

// Закрывает редактор
const closeEditor = () => {
  closeModal(overlayElement);
};

// Открывает редактор
const openEditor = () => {
  openModal({
    modal: overlayElement,
    open: () => overlayElement.classList.remove('hidden'),
    close: () => {
      overlayElement.classList.add('hidden');
      resetEditor();
    }
  });

  initEffects();
};

// Переключает кнопку публикации
const lockSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const unlockSubmitButton = () => {
  submitButtonElement.disabled = false;
};

closeButtonElement.addEventListener('click', closeEditor);

// Обрабатывает публикацию изображения
uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = validateUploadPictureForm();

  if(isValid) {
    lockSubmitButton();

    const formData = new FormData(uploadFormElement);

    uploadPicture(formData)
      .then(() => {
        showPopupSuccess();
        closeEditor();
      })
      .catch((err) => {
        showPopupError(err.message);
      })
      .finally(() => {
        unlockSubmitButton();
      });
  }
});

export {
  openEditor,
};
