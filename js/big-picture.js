import { getPicture } from './data.js';
import { isEscape } from './utils.js';

const COMMENTS_STEP_COUNT = 5;

const rootElement = document.querySelector('.big-picture');

const bigPictureImgElement = rootElement.querySelector('.big-picture__img img');
const bigPictureCaptionElement = rootElement.querySelector('.social__caption');
const bigPictureLikesCount = rootElement.querySelector('.likes-count');

const commentsContainerElement = rootElement.querySelector('.social__comments');
const commentsShownCountElement = rootElement.querySelector('.social__comment-shown-count');
const commentsTotalCountElement = rootElement.querySelector('.social__comment-total-count');
const commentElement = rootElement.querySelector('.social__comment');

const closeButtonElement = rootElement.querySelector('.big-picture__cancel');
const loadMoreCommentButtonElement = rootElement.querySelector('.social__comments-loader');

// Переменные модуля для динамической подгрузки комментарией
let currentComments;
let renderedCommentsCount;

// Скрываем модальное окно с просмотром изображения
const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  rootElement.classList.add('hidden');

  /* eslint-disable no-use-before-define */
  document.removeEventListener('keydown', onKeydownEvent);
  /* eslint-enable no-use-before-define */
};

// Обрабатываем клик на закрытие модального окна
const onCloseButtonClick = () => {
  closeBigPicture();
};

// Обрабатываем клик на Escape
const onKeydownEvent = (evt) => {
  if (isEscape(evt)) {
    closeBigPicture();
  }
};

// Обрабатываем клик на кнопку "Загрузить еще"
const onLoadMoreButtonClick = () => {
  /* eslint-disable no-use-before-define */
  loadMoreComments();
  /* eslint-enable no-use-before-define */
};

// Создаем элемент с комментарием
const createCommentElement = ({ id, avatar, text, name }) => {
  const clonedCommentElement = commentElement.cloneNode(true);
  const avatarElement = clonedCommentElement.querySelector('.social__picture');
  const textElement = clonedCommentElement.querySelector('.social__text');

  avatarElement.src = avatar;
  avatarElement.alt = name;
  textElement.textContent = text;
  clonedCommentElement.dataset.jsId = id;

  return clonedCommentElement;
};

// Добавяем комментарии на страницу
const renderComments = () => {
  const comments = currentComments.slice();

  const commentsFragment = document.createDocumentFragment();

  const shownComments = comments.slice(0, renderedCommentsCount);

  commentsTotalCountElement.textContent = comments.length;
  commentsShownCountElement.textContent = shownComments.length;

  shownComments.forEach((comment) => {
    commentsFragment.appendChild(createCommentElement({
      id: comment.id,
      avatar: comment.avatar,
      text: comment.message,
      name: comment.name
    }));
  });

  if (comments.length > 0 && comments.length > shownComments.length) {
    loadMoreCommentButtonElement.classList.remove('hidden');
  } else {
    loadMoreCommentButtonElement.classList.add('hidden');
  }

  commentsContainerElement.innerHTML = '';
  commentsContainerElement.appendChild(commentsFragment);
};

// Подгружаем дополнительный список комментариев на страницу
const loadMoreComments = () => {
  renderedCommentsCount += COMMENTS_STEP_COUNT;

  renderComments();
};

// Добавляем изображение в модальное окно
const renderBigPicture = ({ url, description, likes }) => {
  bigPictureImgElement.src = url;
  bigPictureCaptionElement.textContent = description;
  bigPictureLikesCount.textContent = likes;
};

// Открываем модальное окна с просмотром изображения
const openBigPicture = (pictureId) => {
  const { url, description, likes, comments } = getPicture(pictureId);

  renderBigPicture({url, description, likes});

  currentComments = comments.slice();
  renderedCommentsCount = COMMENTS_STEP_COUNT;

  renderComments();

  document.body.classList.add('modal-open');
  rootElement.classList.remove('hidden');

  document.addEventListener('keydown', onKeydownEvent);
};

// Добавляем обработчики для элементов модального окна
closeButtonElement.addEventListener('click', onCloseButtonClick);
loadMoreCommentButtonElement.addEventListener('click', onLoadMoreButtonClick);

export {
  openBigPicture
};

