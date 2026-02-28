import { getPictures } from './data.js';
import { openPictureModal } from './picture-modal.js';

// Находим в DOM контейнер .pictures, куда будут добавляться элементы
// Находим template с id #picture и получаем из него шаблон элемента .picture
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

// Создаем функцию createPictureElement — она отвечает за создание одной карточки
const createPictureElement = ({id, url, description, likes, comments }) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureComments = picture.querySelector('.picture__comments');
  const pictureLikes = picture.querySelector('.picture__likes');

  picture.dataset.jsId = id;

  pictureImg.src = url;
  pictureImg.alt = description;
  pictureComments.textContent = comments.length;
  pictureLikes.textContent = likes;

  return picture;
};

// Создаем функцию onPictureClick – она отвечает за обработку клика по карточке
const onPictureClick = (picture) => {
  const id = picture.dataset.jsId;
  openPictureModal(id);
};

// Создаем обработчик клика по контейнеру .pictures
picturesContainer.addEventListener('click', (evt) => {
  const picture = evt.target.closest('.picture');

  if(picture) {
    evt.preventDefault();
    onPictureClick(picture);
  }
});

// Создаем функцию renderPictures — она отвечает за отрисовку всех карточек
const renderPictures = () => {
  const pictures = getPictures();
  const fragment = document.createDocumentFragment();

  pictures.forEach((item) => {
    const picture = createPictureElement(item);
    fragment.appendChild(picture);
  });

  picturesContainer.appendChild(fragment);
};

export {
  renderPictures
};

// Импортируем функцию getPictures для получения массива данных картинок.
// Импортируем функцию openPictureModal для открытия модального окна.
// Находим в DOM контейнер .pictures, куда будут добавляться элементы.
// Находим template с id #picture и получаем из него шаблон элемента .picture.

// Создаем функцию createPictureElement — она отвечает за создание одной карточки.
// Принимаем объект с данными картинки (url, description, likes, comments).
// Клонируем шаблон, чтобы создать новый независимый DOM-элемент.
// Внутри клона находим элементы изображения, лайков и комментариев.
// Заполняем src изображения значением url.
// Заполняем alt изображения значением description.
// Устанавливаем количество комментариев (длина массива comments).
// Устанавливаем количество лайков.
// Возвращаем готовый элемент карточки.

// Создаем функцию renderPictures — она отвечает за отрисовку всех карточек.
// Получаем массив картинок с помощью getPictures().
// Создаем DocumentFragment для оптимальной вставки элементов в DOM.
// Проходимся по массиву картинок методом forEach.
// Для каждой картинки вызываем createPictureElement.
// Добавляем созданный элемент во fragment.
// После завершения цикла добавляем fragment в контейнер .pictures.

// Создаем обработчик клика по контейнеру .pictures.
// Используем делегирование событий — вешаем один обработчик на общий контейнер.
// Внутри обработчика определяем, по какому элементу был совершен клик.
// Проверяем, был ли клик по карточке или по изображению внутри карточки.
// Если клик был по нужному элементу — получаем данные конкретной картинки.
// Вызываем openPictureModal и передаем данные выбранной картинки.
// Это позволяет не вешать отдельный обработчик на каждую карточку.

// Экспортируем функцию renderPictures для использования в других модулях.
