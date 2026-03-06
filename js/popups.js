import { openModal, closeModal } from './modals';

const popupSuccessTemplateElement = document
  .querySelector('#success').content
  .querySelector('.success');

const popupErrorTemplateElement = document
  .querySelector('#error').content
  .querySelector('.error');

const showPopupSuccess = (title) => {
  const popup = popupSuccessTemplateElement.cloneNode(true);
  const closePopupButton = popup.querySelector('.success__button');

  const popupTitle = popup.querySelector('.success__title');

  if (title) {
    popupTitle.textContent = title;
  }

  openModal({
    modal: popup,
    open: () => document.body.appendChild(popup),
    close: () => popup.remove()
  });

  const onClickCloseButton = () => closeModal(popup);

  closePopupButton.addEventListener('click', onClickCloseButton, { once: true });
};

const showPopupError = (title) => {
  const popup = popupErrorTemplateElement.cloneNode(true);
  const closePopupButton = popup.querySelector('.error__button');

  const popupTitle = popup.querySelector('.error__title');

  if (title) {
    popupTitle.textContent = title;
  }

  openModal({
    modal: popup,
    open: () => document.body.appendChild(popup),
    close: () => popup.remove()
  });

  const onClickCloseButton = () => closeModal(popup);

  closePopupButton.addEventListener('click', onClickCloseButton, { once: true });
};

export {
  showPopupSuccess,
  showPopupError
};
