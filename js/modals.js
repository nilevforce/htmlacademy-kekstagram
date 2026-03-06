import { isEscape } from './helpers.js';

const modalStack = [];

const lockBody = () => {
  document.body.classList.add('modal-open');
};

const unlockBody = () => {
  if(modalStack.length > 0) {
    return;
  }

  document.body.classList.remove('modal-open');
};

const openModal = ({
  modal,
  open = () => modal.classList.remove('hidden'),
  close = () => modal.classList.add('hidden')
}) => {
  modalStack.push({ modal, open, close });
  open();

  lockBody();
};

const closeModal = (modal) => {
  const index = modalStack.findIndex((item) => item.modal === modal);

  if (index === -1) {
    return;
  }

  const [removed] = modalStack.splice(index, 1);
  removed.close();

  unlockBody();
};

const closeTopModal = () => {
  if (!modalStack.length > 0) {
    return;
  }

  const modal = modalStack.pop();
  modal.close();

  unlockBody();
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
