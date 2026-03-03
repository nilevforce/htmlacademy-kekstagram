const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Methods = {
  GET: 'GET',
  POST: 'POST'
};

const errorTexts = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (
  route,
  errorText,
  method = Methods.GET,
  body = null
) => fetch(`${BASE_URL}${route}`, {
  method,
  body
})
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(errorText);
  });

const getData = () => load(Routes.GET_DATA, errorTexts.GET_DATA);
const sendData = (body) => load(`${Routes.SEND_DATA}/1`, errorTexts.SEND_DATA, Methods.POST, body);

export {
  getData,
  sendData
};
