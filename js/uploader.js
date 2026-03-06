import { openEditor } from './editor.js';

const imageUploadInputElement = document.querySelector('.img-upload__input');

const initUploader = () => {
  imageUploadInputElement.addEventListener('change', openEditor);
};

export {
  initUploader
};
