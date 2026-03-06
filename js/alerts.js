const dataErrorTemplate = document
  .querySelector('#data-error').content
  .querySelector('.data-error');

const ALERT_TIMEOUT_MS = 5000;

const showAlertError = (message) => {
  const alertElement = dataErrorTemplate.cloneNode(true);
  const alertTitleElement = alertElement.querySelector('.data-error__title');

  if(message) {
    alertTitleElement.textContent = message;
  }

  document.body.appendChild(alertElement);

  setTimeout(
    () => alertElement.remove(),
    ALERT_TIMEOUT_MS
  );
};

export {
  showAlertError
};
