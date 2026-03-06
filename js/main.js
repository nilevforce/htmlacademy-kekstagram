import { showAlertError } from './alerts.js';
import { fetchPictures } from './api.js';
import { initStore } from './store.js';
import { initFeed } from './feed.js';
import { initUploader } from './uploader.js';

const bootstrap = () => {
  fetchPictures()
    .then((pictures) => {
      initStore({ pictures });
    })
    .then(() => {
      initFeed();
      initUploader();
    })
    .catch((err) => showAlertError(err.message));
};

bootstrap();
