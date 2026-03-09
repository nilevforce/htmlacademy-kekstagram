import { openEditor } from './editor.js';
import { showAlertError } from './alerts.js';

const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imageUploadInputElement = document.querySelector('.img-upload__input');
const imageElement = document.querySelector('.img-upload__preview img');

const isAllowedFileType = (fileName) => {
  return ALLOWED_FILE_TYPES.some((item) => fileName.endsWith(item));
};

const onImageUploadInputChange = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  if(!isAllowedFileType(fileName)) {
    imageUploadInputElement.value = '';
    showAlertError('Неподдерживаемый формат изображения.');
    return;
  }

  imageElement.src = URL.createObjectURL(file);

  // Добавляет задержку для устрания скачка загрузки изображения
  setTimeout(() => openEditor(), 200);
};

const initUploader = () => {
  imageUploadInputElement.addEventListener('change', onImageUploadInputChange);
};

export {
  initUploader
};
