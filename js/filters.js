import { getRandomItems } from './helpers.js';
import { getPictures } from './store.js';
import { renderPictures } from './feed.js';
import { debounce } from './helpers.js';

const RANDOM_COUNT_PICTURES = 10;
const RENDER_PICTURE_DELAY = 300;

const FilterTypes = {
  DEFAULT: 'filter-default',
  DISCUSSED: 'filter-discussed',
  RANDOM: 'filter-random',
};

const rootElement = document.querySelector('.img-filters');
const buttonsElement = rootElement.querySelectorAll('.img-filters__button');

const showFilter = () => {
  rootElement.classList.remove('img-filters--inactive');
};

const changeActiveFilterElement = (activeElement) => {
  const current = rootElement.querySelector('.img-filters__button--active');
  current.classList.remove('img-filters__button--active');
  activeElement.classList.add('img-filters__button--active');
};

const debouncedRender = debounce(
  (pictures) => renderPictures(pictures),
  RENDER_PICTURE_DELAY
);

const changeFilter = (type) => {
  let pictures = getPictures();

  if(type === FilterTypes.RANDOM) {
    pictures = getRandomItems(pictures, RANDOM_COUNT_PICTURES);
  }

  if(type === FilterTypes.DISCUSSED) {
    pictures = pictures.slice()
      .sort(
        (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length
      );
  }

  debouncedRender(pictures);
};

const onFilterClick = (evt) => {
  const target = evt.target;
  changeFilter(target.id);
  changeActiveFilterElement(target);
};

for (const button of buttonsElement) {
  button.addEventListener('click', onFilterClick);
}

const initFilters = () => {
  showFilter();
};

export {
  initFilters
};
