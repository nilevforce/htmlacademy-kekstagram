import { getPicture } from './data';
import { isEscape } from './utils.js';

const COMMENTS_SHOWN_COUNT_DEFAULT = 5;

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

const createCommentElement = ({ id, avatar, text }) => {
  const clonedCommentElement = commentElement.cloneNode(true);
  const avatarElement = clonedCommentElement.querySelector('.social__picture');
  const textElement = clonedCommentElement.querySelector('.social__text');

  avatarElement.src = avatar;
  textElement.textContent = text;
  clonedCommentElement.dataset.jsId = id;

  return clonedCommentElement;
};

const closePictureModal = () => {
  document.body.classList.remove('modal-open');
  rootElement.classList.add('hidden');

  /* eslint-disable no-use-before-define */
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  loadMoreCommentButtonElement.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onKeydownEvent);
  /* eslint-enable no-use-before-define */
};

const onCloseButtonClick = () => {
  closePictureModal();
};

const onKeydownEvent = (evt) => {
  if (isEscape(evt)) {
    closePictureModal();
  }
};

const onLoadMoreButtonClick = () => {
  /* eslint-disable no-use-before-define */
  loadMoreComments();
  /* eslint-enable no-use-before-define */
};

// const renderComments = () => {};

const openPictureModal = (pictureId) => {
  const { url, description, likes, comments } = getPicture(pictureId);

  bigPictureImgElement.src = url;
  bigPictureCaptionElement.textContent = description;
  bigPictureLikesCount.textContent = likes;
  commentsTotalCountElement.textContent = comments.length;

  const commentsFragment = document.createDocumentFragment();
  const shownComments = comments.slice(0, COMMENTS_SHOWN_COUNT_DEFAULT);

  shownComments.forEach((comment) => {
    commentsFragment.appendChild(createCommentElement({
      id: comment.id,
      avatar: comment.avatar,
      text: comment.message,
    }));
  });

  if (comments.length > 0 && comments.length > shownComments.length) {
    loadMoreCommentButtonElement.classList.remove('hidden');
  } else {
    loadMoreCommentButtonElement.classList.add('hidden');
  }

  commentsShownCountElement.textContent = shownComments.length;
  commentsContainerElement.innerHTML = '';
  commentsContainerElement.appendChild(commentsFragment);

  document.body.classList.add('modal-open');
  rootElement.classList.remove('hidden');

  loadMoreCommentButtonElement.addEventListener('click', onLoadMoreButtonClick);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onKeydownEvent);
};

const loadMoreComments = () => {

};

export {
  openPictureModal
};
