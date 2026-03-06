/**
 * Необходимо написать две функции: GET и POST.
 * getPictures - запрос изображений с сервера
 * uploadPicture – отправка загруженного изображения на сервер
 */

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Methods = {
  GET: 'GET',
  POST: 'POST'
};

const Routes = {
  GET_PICTURE: '/data',
  UPLOAD_PICTURE: '/'
};

const ErrorMessages = {
  GET_PICTURE: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  UPLOAD_PICTURE: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const request = (
  route,
  errorMessage,
  method = Methods.GET,
  body = null,
) => {
  return fetch(
    `${BASE_URL}${route}`, {
      method,
      body
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error(errorMessage);
      }

      return response.json();
    })
    .then((data) => data)
    .catch((err) => {
      throw err;
    });
};

const fetchPictures = () => {
  return request(Routes.GET_PICTURE, ErrorMessages.GET_PICTURE);
};

const uploadPicture = (payload) => {
  return request(Routes.UPLOAD_PICTURE, ErrorMessages.UPLOAD_PICTURE, Methods.POST, payload);
};

export {
  fetchPictures,
  uploadPicture
};
