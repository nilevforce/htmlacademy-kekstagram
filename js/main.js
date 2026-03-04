import { showAlertError } from './alerts.js';
import { fetchPictures } from './api.js';
import { initStore } from './store.js';
import { initFeed } from './feed.js';

const bootstrap = () => {
  fetchPictures()
    .then((pictures) => {
      initStore({ pictures });
    })
    .then(() => {
      initFeed();
    })
    .catch((err) => showAlertError(err.message));
};

bootstrap();

// Нужно организовать обработку ESC с модальными окнами и попапами
// чтобы открытые друг по верх друга окна закрывались последовательно

