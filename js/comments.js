const rootElement = document.querySelector('.social');
const commentsShownCountElement = rootElement.querySelector('.social__comment-shown-count');
const commentsTotalCountElement = rootElement.querySelector('.social__comment-total-count');
const commentTemplateElement = rootElement.querySelector('.social__comment');
const commentsContainerElement = rootElement.querySelector('.social__comments');
const loadMoreCommentButtonElement = rootElement.querySelector('.social__comments-loader');

const COMMENTS_SHOWN_COUNT_DEFAULT = 5;
const COMMENTS_STEP_COUNT = 5;

let currentComments = [];
let renderedCommentsCount = 0;

const createCommentElement = ({ id, avatar, text, name }) => {
  const commentElement = commentTemplateElement.cloneNode(true);
  const avatarElement = commentElement.querySelector('.social__picture');
  const textElement = commentElement.querySelector('.social__text');

  avatarElement.src = avatar;
  avatarElement.alt = name;
  textElement.textContent = text;
  commentElement.dataset.jsId = id;

  return commentElement;
};

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

const loadMoreComments = () => {
  renderedCommentsCount += COMMENTS_STEP_COUNT;

  renderComments();
};

const initComments = (comments) => {
  currentComments = comments;
  renderedCommentsCount = COMMENTS_SHOWN_COUNT_DEFAULT;

  renderComments();
};

loadMoreCommentButtonElement.addEventListener('click', loadMoreComments);

export {
  initComments
};
