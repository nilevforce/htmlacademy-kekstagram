const RANDOM_MIN_DEFAULT = 0;
const RANDOM_MAX_DEFAULT = 1000;
const ALERT_SHOW_TIME = 5000;

const errorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');

const getRandomInt = (
  min = RANDOM_MIN_DEFAULT,
  max = RANDOM_MAX_DEFAULT
) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + min;
};

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const createIdGenerator = () => {
  let currentId = 0;
  return () => ++currentId;
};

const isEscape = (evt) => evt.key === 'Escape';

const showErrorAlert = (message) => {
  const errorElement = errorTemplateElement.cloneNode(true);
  const errorTitleElement = errorElement.querySelector('.data-error__title');
  const currentTitle = errorTitleElement.textContent;
  errorTitleElement.textContent = message || currentTitle || 'Упс.. Ошибочка вышла :(';

  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getRandomArrayElement,
  createIdGenerator,
  getRandomInt,
  isEscape,
  showErrorAlert
};
