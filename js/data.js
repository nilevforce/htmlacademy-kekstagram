import {
  getRandomArrayElement,
  createIdGenerator,
  getRandomInt
} from './utils.js';

// CONSTANTS

const PICTURE_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR_INDEX = 1;
const MAX_AVATAR_INDEX = 6;

const NAMES = [
  'Алексей',
  'Дмитрий',
  'Сергей',
  'Игорь',
  'Максим',
  'Роман',
  'Владимир',
  'Андрей',
  'Евгений',
  'Никита',
  'Павел',
  'Константин',
  'Тимур',
  'Артур',
  'Олег',
  'Денис',
  'Ярослав',
  'Вячеслав',
  'Глеб',
  'Степан',
  'Руслан',
  'Михаил',
  'Антон',
  'Богдан',
  'Кирилл',
  'Валерий',
  'Эдуард',
  'Георгий',
  'Леонид',
  'Всеволод'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PICTURE_DESCRIPTIONS = [
  'Тёплый закат у моря',
  'Утренний кофе и тишина',
  'Город после дождя',
  'Улыбка без причины',
  'Лёгкий летний ветер',
  'Прогулка по старым улицам',
  'Первый снег',
  'Огни большого города',
  'Спонтанное путешествие',
  'Момент спокойствия',
  'Вид с высоты',
  'Закатные облака',
  'Домашний уют',
  'Солнечный день',
  'Дорога вдаль',
  'Тени на стене',
  'Пойманный момент',
  'Морской бриз',
  'Осенние листья',
  'Ночной разговор',
  'Свет в окне',
  'Лесная тропа',
  'Летний вечер',
  'Счастливый случай',
  'Вкус свободы',
  'Горячий чай',
  'Портрет в отражении',
  'Тихая гавань',
  'Золотой час',
  'Музыка в наушниках',
  'Ритм мегаполиса',
  'Улыбки друзей',
  'Дождливое настроение',
  'Рассвет в горах',
  'Случайный кадр',
  'Цветы на подоконнике',
  'Дальняя поездка',
  'Ветер в волосах',
  'Морская волна',
  'Секунда до смеха',
  'Светофоры ночью',
  'Лёгкая усталость',
  'Окно в лето',
  'Песчаный берег',
  'Уютный вечер',
  'Шум прибоя',
  'Старый парк',
  'Мгновение счастья',
  'Путь домой',
  'Небо перед грозой'
];

// FUNCTIONS

const createPictureId = createIdGenerator();
const createCommentId = createIdGenerator();

const createComment = () => {
  return {
    id: createCommentId(),
    avatar: `img/avatar-${getRandomInt(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES)
  };
};

const getComments = () => {
  return Array.from({ length: getRandomInt(MIN_COMMENTS, MAX_COMMENTS) }, createComment);
};

const createPicture = () => {
  const pictureId = createPictureId();

  return {
    id: pictureId,
    url: `photos/${pictureId}.jpg`,
    description: getRandomArrayElement(PICTURE_DESCRIPTIONS),
    likes: getRandomInt(MIN_LIKES, MAX_LIKES),
    comments: getComments()
  };
};

const pictures = Array.from({ length: PICTURE_COUNT }, createPicture);

// Методы для взаимодействия со списком изображений
const getPictures = () => structuredClone(pictures);
const getPicture = (id) => {
  return pictures.find((item) => item.id === Number(id));
};

export {
  getPictures,
  getPicture
};
