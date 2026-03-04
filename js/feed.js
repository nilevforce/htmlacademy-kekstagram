import { getPictures } from './store.js';
import { openPictureViewer } from './viewer.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document
  .querySelector('#picture').content
  .querySelector('.picture');

const createPictureElement = ({id, url, description, likes, comments }) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureComments = picture.querySelector('.picture__comments');
  const pictureLikes = picture.querySelector('.picture__likes');

  picture.dataset.jsId = id;

  pictureImg.src = url;
  pictureImg.alt = description;
  pictureComments.textContent = comments.length;
  pictureLikes.textContent = likes;

  return picture;
};

// Обрабатывает клик по изображению
const onPictureClick = (picture) => {
  const pictureId = picture.dataset.jsId;
  openPictureViewer(pictureId);
};

// Добвляет обработчик клика на изображение
picturesContainer.addEventListener('click', (evt) => {
  const picture = evt.target.closest('.picture');

  if(picture) {
    evt.preventDefault();
    onPictureClick(picture);
  }
});

// Добавляет изображения на страницу с лентой
const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((element) => {
    fragment.appendChild(
      createPictureElement(element)
    );
  });

  picturesContainer.appendChild(fragment);
};

// Инициализирует ленту при загрузке странице
const initFeed = () => {
  const pictures = getPictures();
  renderPictures(pictures);
};

export {
  initFeed
};
