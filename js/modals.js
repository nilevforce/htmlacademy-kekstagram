import { isEscape } from './helpers.js';

const modalStack = [];

const openModal = ({ modal, open, close }) => {
  modalStack.push({ modal, open, close });
  open();
};

const closeModal = (modal) => {
  const index = modalStack.findIndex((item) => item.modal === modal);

  if (index === -1) {
    return;
  }

  const [removed] = modalStack.splice(index, 1);
  removed.close();
};

const onKeydownEvent = (evt) => {
  if (!isEscape(evt)) {
    return;
  }

  if (modalStack.length > 0) {
    const modal = modalStack.pop();
    modal.close();
  }
};

document.body.addEventListener('keydown', onKeydownEvent);

export {
  openModal,
  closeModal
};
