import { isEscape } from './utils';
import { sendData } from './api';

const SCALE_DEFAULT = 1;
const SCALE_MIN = 0.25;
const SCALE_MAX = 1;
const SCALE_STEP = 0.25;

const FILTER_CHROME_DEFAULT = 1;
const FILTER_CHROME_MIN = 0;
const FILTER_CHROME_MAX = 1;
const FILTER_CHROME_STEP = 0.1;

const FILTER_SEPIA_DEFAULT = 1;
const FILTER_SEPIA_MIN = 0;
const FILTER_SEPIA_MAX = 1;
const FILTER_SEPIA_STEP = 0.1;

const FILTER_MARVIN_DEFAULT = 100;
const FILTER_MARVIN_MIN = 0;
const FILTER_MARVIN_MAX = 100;
const FILTER_MARVIN_STEP = 1;

const FILTER_PHOBOS_DEFAULT = 3;
const FILTER_PHOBOS_MIN = 0;
const FILTER_PHOBOS_MAX = 3;
const FILTER_PHOBOS_STEP = 0.1;

const FILTER_HEAT_DEFAULT = 3;
const FILTER_HEAT_MIN = 1;
const FILTER_HEAT_MAX = 3;
const FILTER_HEAT_STEP = 0.1;

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCloseButton = uploadForm.querySelector('.img-upload__cancel');
const uploadSubmitButton = uploadForm.querySelector('.img-upload__submit');

const successUploadMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorUploadMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const previewImage = uploadForm.querySelector('.img-upload__preview img');
const scaleControls = uploadForm.querySelector('.img-upload__scale');
const scaleUpButton = scaleControls.querySelector('.scale__control--smaller');
const scaleDownButton = scaleControls.querySelector('.scale__control--bigger');
const scaleValue = scaleControls.querySelector('.scale__control--value');

// Управление фильтрами
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const slider = uploadForm.querySelector('.effect-level__slider');
const filterInputs = uploadForm.getElementsByClassName('effects__radio'); // Живая коллекция
const filterInputValue = uploadForm.querySelector('.effect-level__value');

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
  slider.classList.add('hidden');
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
  slider.classList.remove('hidden');
};

const getActiveFilter = () => {
  const inputsList = Array.from(filterInputs);
  const activeInput = inputsList.find((input) => input.checked);

  return activeInput.value;
};

// uploadOverlay.classList.remove('hidden');

const setFilterInputValue = (newValue) => {
  filterInputValue.value = newValue;
};

// Управление фильтром ORIGINAL
const applyOriginalFilter = () => {
  previewImage.style.filter = '';
};

const setOriginalFilter = () => {
  applyOriginalFilter();
  setFilterInputValue();
  hideSlider();
};

// Управление фильтром CHROME
const applyChromeFilter = (newValue) => {
  previewImage.style.filter = `grayscale(${newValue})`;
};

const setChromeFilter = () => {
  applyChromeFilter(FILTER_CHROME_DEFAULT);
  setFilterInputValue(FILTER_CHROME_DEFAULT);

  const sliderOptions = {
    start: FILTER_CHROME_DEFAULT,
    range: {
      min: FILTER_CHROME_MIN,
      max: FILTER_CHROME_MAX
    },
    step: FILTER_CHROME_STEP
  };

  slider.noUiSlider.updateOptions(sliderOptions);

  showSlider();
};

const updateChromeFilter = (value) => {
  applyChromeFilter(value);
  setFilterInputValue(value);
};

// Управление фильтром SEPIA
const applySepiaFilter = (newValue) => {
  previewImage.style.filter = `sepia(${newValue})`;
};

const setSepiaFilter = () => {
  applySepiaFilter(FILTER_SEPIA_DEFAULT);
  setFilterInputValue(FILTER_SEPIA_DEFAULT);

  const sliderOptions = {
    start: FILTER_SEPIA_DEFAULT,
    range: {
      min: FILTER_SEPIA_MIN,
      max: FILTER_SEPIA_MAX
    },
    step: FILTER_SEPIA_STEP
  };

  slider.noUiSlider.updateOptions(sliderOptions);

  showSlider();
};

const updateSepiaFilter = (value) => {
  applySepiaFilter(value);
  setFilterInputValue(value);
};

// Управление фильтром MARVIN
const applyMarvinFilter = (newValue) => {
  previewImage.style.filter = `invert(${newValue}%)`;
};

const setMarvinFilter = () => {
  applyMarvinFilter(FILTER_MARVIN_DEFAULT);
  setFilterInputValue(FILTER_MARVIN_DEFAULT);

  const sliderOptions = {
    start: FILTER_MARVIN_DEFAULT,
    range: {
      min: FILTER_MARVIN_MIN,
      max: FILTER_MARVIN_MAX
    },
    step: FILTER_MARVIN_STEP
  };

  slider.noUiSlider.updateOptions(sliderOptions);

  showSlider();
};

const updateMarvinFilter = (value) => {
  applyMarvinFilter(value);
  setFilterInputValue(value);
};

// Управление фильтром PHOBOS
const applyPhobosFilter = (newValue) => {
  previewImage.style.filter = `blur(${newValue}px)`;
};

const setPhobosFilter = () => {
  applyPhobosFilter(FILTER_PHOBOS_DEFAULT);
  setFilterInputValue(FILTER_PHOBOS_DEFAULT);

  const sliderOptions = {
    start: FILTER_PHOBOS_DEFAULT,
    range: {
      min: FILTER_PHOBOS_MIN,
      max: FILTER_PHOBOS_MAX
    },
    step: FILTER_PHOBOS_STEP
  };

  slider.noUiSlider.updateOptions(sliderOptions);

  showSlider();
};

const updatePhobosFilter = (value) => {
  applyPhobosFilter(value);
  setFilterInputValue(value);
};

// Управление фильтром HEAT
const applyHeatFilter = (newValue) => {
  previewImage.style.filter = `brightness(${newValue})`;
};

const setHeatFilter = () => {
  applyHeatFilter(FILTER_HEAT_DEFAULT);
  setFilterInputValue(FILTER_HEAT_DEFAULT);

  const sliderOptions = {
    start: FILTER_HEAT_DEFAULT,
    range: {
      min: FILTER_HEAT_MIN,
      max: FILTER_HEAT_MAX
    },
    step: FILTER_HEAT_STEP
  };

  slider.noUiSlider.updateOptions(sliderOptions);

  showSlider();
};

const updateHeatFilter = (value) => {
  applyHeatFilter(value);
  setFilterInputValue(value);
};

// Смена фильтра
const onFilterInputClick = (evt) => {
  const filter = evt.target.value;

  if(filter === 'none') {
    setOriginalFilter();
  }

  if(filter === 'chrome') {
    setChromeFilter();
  }

  if(filter === 'sepia') {
    setSepiaFilter();
  }

  if(filter === 'marvin') {
    setMarvinFilter();
  }

  if(filter === 'phobos') {
    setPhobosFilter();
  }

  if(filter === 'heat') {
    setHeatFilter();
  }
};

for (const filterInput of filterInputs) {
  filterInput.addEventListener('click', onFilterInputClick);
}

const initFilterControls = () => {
  setOriginalFilter();

  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower'
  });

  slider.noUiSlider.on('slide', (value) => {
    const filter = getActiveFilter();

    if(filter === 'chrome') {
      updateChromeFilter(value);
    }

    if(filter === 'sepia') {
      updateSepiaFilter(value);
    }

    if(filter === 'marvin') {
      updateMarvinFilter(value);
    }

    if(filter === 'phobos') {
      updatePhobosFilter(value);
    }

    if(filter === 'heat') {
      updateHeatFilter(value);
    }
  });
};

// Масштабирование изображения
let currentScale = SCALE_DEFAULT;

const onScaleUpButtonClick = () => {
  if(currentScale > SCALE_MIN) {
    currentScale = currentScale - SCALE_STEP;
    previewImage.style.transform = `scale(${currentScale})`;
    scaleValue.value = `${currentScale * 100 }%`;
  }
};

const onScaleDownButtonClick = () => {
  if(currentScale < SCALE_MAX) {
    currentScale = currentScale + SCALE_STEP;
    previewImage.style.transform = `scale(${currentScale})`;
    scaleValue.value = `${currentScale * 100 }%`;
  }
};

// Добавляем валидаторы для формы
const pristine = new Pristine(
  uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p',
    errorTextClass: 'img-upload__field-wrapper--error'
  },
  false
);

// Проверка количества хэштегов
pristine.addValidator(
  hashtagInput,
  (value) => {
    const hashtagsList = value.trim().split(/\s+/);
    return value.trim() ? hashtagsList.length <= 5 : true;
  },
  'Разрешено не более 5 хэштегов'
);

// Проверка на повторы хэшегов
pristine.addValidator(
  hashtagInput,
  (value) => {
    const hashtagsList = value.trim().toLowerCase().split(/\s+/);
    return value.trim() ? new Set(hashtagsList).size === hashtagsList.length : true;
  },
  'Хэштеги не должны повторяться'
);

// Проверка написания хэштегов
pristine.addValidator(
  hashtagInput,
  (value) => {
    const hashtagsList = value.trim().split(/\s+/);
    const re = /^#[a-zа-яё0-9]{1,19}$/i;
    return value.trim() ? hashtagsList.every((hashtag) => re.test(hashtag)) : true;
  },
  'Хэштег должен начинаться с #, может содержать только буквы и цифры, длина не должна превышать 20 символов'
);

// Проверка длины комментария
pristine.addValidator(
  commentInput,
  (value) => {
    return value.length <= 140;
  },
  'Длина комментария не может составлять больше 140 символов;'
);

// Управление состоянием Sumbit кнопки
const lockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
};

const unlockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
};

// Управление модальным окном
const openUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  /* eslint-disable-next-line no-use-before-define */
  document.addEventListener('keydown', onKeydownEvent);
};

const closeUploadModal = () => {
  uploadForm.reset();

  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  /* eslint-disable-next-line no-use-before-define */
  document.removeEventListener('keydown', onKeydownEvent);
};

const onKeydownEvent = (evt) => {
  if (isEscape(evt)) {
    if(evt.target === commentInput) {
      evt.stopPropagation();
      return;
    }

    if(evt.target === hashtagInput) {
      evt.stopPropagation();
      return;
    }

    closeUploadModal();
  }
};

// Уведомления о результате загрузки изображения
const showUploadSuccessMessage = () => {
  const modal = successUploadMessageTemplate.cloneNode(true);
  const closeButton = modal.querySelector('.success__button');

  const closeModal = () => {
    modal.remove();
    document.removeEventListener('keydown', onEscKeydown);
  };

  const onEscKeydown = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  closeButton.addEventListener('click', closeModal, { once: true });
  document.addEventListener('keydown', onEscKeydown);

  document.body.appendChild(modal);
};

const showUploadErrorMessage = () => {
  const modal = errorUploadMessageTemplate.cloneNode(true);
  const closeButton = modal.querySelector('.error__button');

  const closeModal = () => {
    modal.remove();
    document.removeEventListener('keydown', onEscKeydown);
  };

  const onEscKeydown = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  closeButton.addEventListener('click', closeModal, { once: true });
  document.addEventListener('keydown', onEscKeydown);

  document.body.appendChild(modal);
};

// Остальные обработчики
uploadInput.addEventListener('change', () => {
  if (uploadInput.files.length) {
    openUploadModal();
  }
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValidForm = pristine.validate();

  if(isValidForm) {
    lockSubmitButton();

    const form = evt.target;
    const formData = new FormData(form);

    sendData(formData)
      .then(() => {
        showUploadSuccessMessage();
        form.reset();
        closeUploadModal();
      })
      .catch(() => showUploadErrorMessage())
      .finally(() => {
        unlockSubmitButton();
      });
  }
});

scaleUpButton.addEventListener('click', onScaleUpButtonClick);
scaleDownButton.addEventListener('click', onScaleDownButtonClick);

uploadCloseButton.addEventListener('click', closeUploadModal);

initFilterControls();
