import { getPictures } from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const createPictureElement = ({ url, description, likes, comments }) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureComments = picture.querySelector('.picture__comments');
  const pictureLikes = picture.querySelector('.picture__likes');

  pictureImg.src = url;
  pictureImg.alt = description;
  pictureComments.textContent = comments.length;
  pictureLikes.textContent = likes;

  return picture;
};

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
