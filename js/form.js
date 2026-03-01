import { isEscape } from './utils';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCloseButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

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

uploadInput.addEventListener('change', () => {
  if (uploadInput.files.length) {
    openUploadModal();
  }
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValidForm = pristine.validate();

  if(isValidForm) {
    return evt.target.submit();
  }
});

uploadCloseButton.addEventListener('click', closeUploadModal);
