import { showAlertError } from './alerts.js';
import { fetchPictures } from './api.js';
import { initStore } from './store.js';
import { initUploader } from './uploader.js';
import { initFilters } from './filters.js';
import { initFeed } from './feed.js';

const bootstrap = async () => {
  try {
    initUploader();

    const pictures = await fetchPictures();

    initStore({ pictures });
    initFeed();
    initFilters();
  } catch (error) {
    showAlertError(error.message);
  }
};

bootstrap();
