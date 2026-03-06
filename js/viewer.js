import { openModal, closeModal } from './modals.js';
import { getPictureById } from './store.js';
import { initComments } from './comments.js';

const rootElement = document.querySelector('.big-picture');
const closeButtonElement = rootElement.querySelector('.big-picture__cancel');

const pictureImageElement = rootElement.querySelector('.big-picture__preview img');
const pictureDescriptionElement = rootElement.querySelector('.social__caption');
const pictureLikesCountElement = rootElement.querySelector('.likes-count');

const renderPictureImage = ({ description, url, likes }) => {
  pictureImageElement.src = url;
  pictureDescriptionElement.textContent = description;
  pictureLikesCountElement.textContent = likes;
};

// Открывает окно просмотра изображения
const openPictureViewer = (pictureId) => {
  const picture = getPictureById(pictureId);

  renderPictureImage(picture);
  initComments(picture.comments);

  openModal({ modal: rootElement });
};

// Закрывает окно просмотра изображения
const closePictureViewer = () => {
  closeModal(rootElement);
};

closeButtonElement.addEventListener('click', closePictureViewer);

export {
  openPictureViewer
};
