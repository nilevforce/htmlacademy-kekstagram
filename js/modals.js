import { isEscape } from './helpers.js';

const modalStack = [];

const openModal = ({ modal, open, close }) => {
  modalStack.push({ modal, open, close });
  open();

  document.body.classList.add('modal-open');
};

const closeModal = (modal) => {
  const index = modalStack.findIndex((item) => item.modal === modal);

  if (index === -1) {
    return;
  }

  const [removed] = modalStack.splice(index, 1);
  removed.close();

  document.body.classList.remove('modal-open');
};

const closeTopModal = () => {
  if (!modalStack.length > 0) {
    return;
  }

  const modal = modalStack.pop();
  modal.close();

  document.body.classList.remove('modal-open');
};

const onKeydownEvent = (evt) => {
  if (!isEscape(evt)) {
    return;
  }

  closeTopModal();
};

document.body.addEventListener('keydown', onKeydownEvent);

export {
  openModal,
  closeModal
};
