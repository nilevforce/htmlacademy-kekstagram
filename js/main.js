import './form.js';
import { getData } from './api.js';
import { renderPictures } from './pictures.js';
import { showErrorAlert } from './utils.js';

getData()
  .then((pictures) => {
    renderPictures(pictures);
  })
  .catch((err) => {
    showErrorAlert(err.message);
  });
