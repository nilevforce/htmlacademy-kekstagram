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

const request = async (
  route,
  errorMessage,
  method = Methods.GET,
  body = null,
) => {
  const response = await fetch(`${BASE_URL}${route}`, { method, body });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return await response.json();
};

const fetchPictures = async () => {
  return request(Routes.GET_PICTURE, ErrorMessages.GET_PICTURE);
};

const uploadPicture = async (payload) => {
  return request(Routes.UPLOAD_PICTURE, ErrorMessages.UPLOAD_PICTURE, Methods.POST, payload);
};

export {
  fetchPictures,
  uploadPicture
};
