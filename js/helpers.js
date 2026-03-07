const isEscape = (evt) => evt.key === 'Escape';

const getRandomItems = (arr, count = 1) => {
  if (count > arr.length) {
    throw new Error('Количество элементов больше длины массива');
  }

  const copy = [...arr];

  for (let i = copy.length - 1; i > copy.length - 1 - count; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(-count);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscape,
  getRandomItems,
  debounce
};

