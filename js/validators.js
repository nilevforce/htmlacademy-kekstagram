const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFormHashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const uploadFormCommentInputElement = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(
  uploadFormElement, {
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
  uploadFormHashtagInputElement,
  (value) => {
    const hashtagsList = value.trim().split(/\s+/);
    return value.trim() ? hashtagsList.length <= 5 : true;
  },
  'Разрешено не более 5 хэштегов'
);

// Проверка написания хэштегов
pristine.addValidator(
  uploadFormHashtagInputElement,
  (value) => {
    const hashtagsList = value.trim().split(/\s+/);
    const re = /^#[a-zа-яё0-9]{1,19}$/i;
    return value.trim() ? hashtagsList.every((hashtag) => re.test(hashtag)) : true;
  },
  'Хэштег должен начинаться с #, может содержать только буквы и цифры, длина не должна превышать 20 символов'
);

// Проверка длины комментария
pristine.addValidator(
  uploadFormCommentInputElement,
  (value) => {
    return value.length <= 140;
  },
  'Длина комментария не может составлять больше 140 символов'
);

// Проверка на повторы хэшегов
pristine.addValidator(
  uploadFormHashtagInputElement,
  (value) => {
    const hashtagsList = value.trim().toLowerCase().split(/\s+/);
    return value.trim() ? new Set(hashtagsList).size === hashtagsList.length : true;
  },
  'Хэштеги не должны повторяться'
);

// Валидация перед публикацией изображения
const validateUploadPictureForm = () => {
  return pristine.validate();
};

export {
  validateUploadPictureForm
};
