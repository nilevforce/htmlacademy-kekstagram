const RANDOM_MIN_DEFAULT = 0;
const RANDOM_MAX_DEFAULT = 1000;

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

export {
  getRandomArrayElement,
  createIdGenerator,
  getRandomInt,
  isEscape
};
