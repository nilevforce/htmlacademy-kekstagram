import { showAlertError } from './alerts.js';
import { fetchPictures } from './api.js';
import { initStore } from './store.js';
import { initUploader } from './uploader.js';
import { initFilters } from './filters.js';
import { initFeed } from './feed.js';

const bootstrap = async () => {
  try {
    const pictures = await fetchPictures();

    initStore({ pictures });
    initUploader();
    initFeed();
    initFilters();
  } catch (error) {
    showAlertError(error.message);
  }
};

bootstrap();
