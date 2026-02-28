import { getPictures } from './data.js';
import { openBigPicture } from './big-picture.js';

// Находим в DOM контейнер .pictures, куда будут добавляться элементы
// Находим template с id #picture и получаем из него шаблон элемента .picture
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

// Создаем функцию createPictureElement — она отвечает за создание одной карточки
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

// Создаем функцию onPictureClick – она отвечает за обработку клика по карточке
const onPictureClick = (picture) => {
  const id = picture.dataset.jsId;
  openBigPicture(id);
};

// Создаем обработчик клика по контейнеру .pictures
picturesContainer.addEventListener('click', (evt) => {
  const picture = evt.target.closest('.picture');

  if(picture) {
    evt.preventDefault();
    onPictureClick(picture);
  }
});

// Создаем функцию renderPictures — она отвечает за отрисовку всех карточек
const renderPictures = () => {
  const pictures = getPictures();
  const fragment = document.createDocumentFragment();

  pictures.forEach((item) => {
    const picture = createPictureElement(item);
    fragment.appendChild(picture);
  });

  picturesContainer.appendChild(fragment);
};

export {
  renderPictures
};
