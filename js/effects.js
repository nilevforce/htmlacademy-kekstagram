const rootElement = document.querySelector('.img-upload');

const pictureElement = rootElement.querySelector('.img-upload__preview img');

const sliderContainerElement = rootElement.querySelector('.img-upload__effect-level');
const sliderElement = rootElement.querySelector('.effect-level__slider');

const scaleControlsElement = rootElement.querySelector('.img-upload__scale');
const scaleUpButtonElement = scaleControlsElement.querySelector('.scale__control--bigger');
const scaleDownButtonElement = scaleControlsElement.querySelector('.scale__control--smaller');
const scaleValueInputElement = scaleControlsElement.querySelector('.scale__control--value');

const effectInputsElement = rootElement.querySelectorAll('.effects__radio');
const effectInputValueElement = rootElement.querySelector('.effect-level__value');

const SCALE_SETTINGS = {
  DEFAULT: 1,
  MIN: 0.25,
  MAX: 1,
  STEP: 0.25,
};

const EFFECT_SETTINGS = {
  chrome: {
    DEFAULT: 1,
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    getFilter: (value) => `grayscale(${value})`
  },
  sepia: {
    DEFAULT: 1,
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    getFilter: (value) => `sepia(${value})`
  },
  marvin: {
    DEFAULT: 100,
    MIN: 0,
    MAX: 100,
    STEP: 1,
    getFilter: (value) => `invert(${value}%)`
  },
  phobos: {
    DEFAULT: 3,
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    getFilter: (value) => `blur(${value}px)`
  },
  heat: {
    DEFAULT: 3,
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    getFilter: (value) => `brightness(${value})`
  },
};

let currentScale = SCALE_SETTINGS.DEFAULT;
let currentEffect;

const increaseScale = () => {
  if(currentScale >= SCALE_SETTINGS.MAX) {
    return;
  }

  currentScale += SCALE_SETTINGS.STEP;
  pictureElement.style.transform = `scale(${currentScale})`;
  scaleValueInputElement.value = `${currentScale * 100}%`;
};

const decreaseScale = () => {
  if(currentScale <= SCALE_SETTINGS.MIN) {
    return;
  }

  currentScale -= SCALE_SETTINGS.STEP;
  pictureElement.style.transform = `scale(${currentScale})`;
  scaleValueInputElement.value = `${currentScale * 100}%`;
};

const onScaleChange = (evt) => {
  if (evt.target === scaleUpButtonElement) {
    increaseScale();
  }

  if (evt.target === scaleDownButtonElement) {
    decreaseScale();
  }
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
  sliderElement.classList.add('hidden');
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
  sliderElement.classList.remove('hidden');
};

const applyEffect = (value) => {
  pictureElement.style.filter = value || '';
};

const setEffect = (name) => {
  currentEffect = name;

  if (name === 'none') {
    applyEffect();
    hideSlider();
    return;
  }

  const start = EFFECT_SETTINGS[name].DEFAULT;
  const max = EFFECT_SETTINGS[name].MAX;
  const min = EFFECT_SETTINGS[name].MIN;
  const step = EFFECT_SETTINGS[name].STEP;

  const filterValue = EFFECT_SETTINGS[name].getFilter(start);

  effectInputValueElement.value = start;

  applyEffect(filterValue);

  const sliderOptions = {
    start,
    range: { min, max },
    step
  };

  sliderElement.noUiSlider.updateOptions(sliderOptions);

  showSlider();
};

const updateEffect = (value) => {
  const filterValue = EFFECT_SETTINGS[currentEffect].getFilter(value);

  effectInputValueElement.value = value;

  applyEffect(filterValue);
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower'
  });

  sliderElement.noUiSlider.on('slide', (value) => {
    updateEffect(value);
  });
};

for (const effectInputElement of effectInputsElement) {
  effectInputElement.addEventListener('change', onEffectChange);
}

scaleControlsElement.addEventListener('click', onScaleChange);

const initEffects = () => {
  hideSlider();
  createSlider();
};

const resetEffects = () => {
  currentScale = SCALE_SETTINGS.DEFAULT;
  currentEffect = 'none';
  setEffect(currentEffect);
  sliderElement.noUiSlider.destroy();
};

export {
  initEffects,
  resetEffects
};
