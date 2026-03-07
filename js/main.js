import { showAlertError } from './alerts.js';
import { fetchPictures } from './api.js';
import { initStore } from './store.js';
import { initFeed } from './feed.js';
import { initUploader } from './uploader.js';

const bootstrap = async () => {
  try {
    const pictures = await fetchPictures();

    initStore({ pictures });
    initFeed();
    initUploader();
  } catch (error) {
    showAlertError(error.message);
  }
};

bootstrap();
