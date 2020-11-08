'use strict';

(function () {
  const ESC_KEY_CODE = 27;
  const ENTER_KEY_CODE = 13;

  const isEscEvent = (evt, action) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      action();
    }
  };

  const isEnterEvent = (evt, action) => {
    if (evt.keyCode === ENTER_KEY_CODE) {
      action();
    }
  };

  const returnsRandomData = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const removeElement = (element) => element.remove();

  const deletePins = () => {
    const pins = document.querySelectorAll(`.map__pin`);

    for (let i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  const showPopUp = (popup) => {
    popup.classList.remove(`hidden`);
  };

  function processingRequests(url, onSuccess, onError, requestMethod, data) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    const XHR_STATUS_SUCCESSFUL_RESPONSES = 200;
    const XHR_STATUS_CLIENT_ERROR = 400;
    const XHR_STATUS_SERVER_ERROR = 500;
    const XHR_TIMEOUT = 10000; // 10s

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case XHR_STATUS_SUCCESSFUL_RESPONSES:
          onSuccess(xhr.response);
          break;

        case XHR_STATUS_CLIENT_ERROR:
          error = `Неверный запрос`;
          break;

        case XHR_STATUS_SERVER_ERROR:
          error = `Внутренняя ошибка сервера`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = XHR_TIMEOUT; // 10s

    xhr.open(requestMethod, url);
    xhr.send(data);
  }

  window.util = {
    isEscEvent,
    isEnterEvent,
    removeElement,
    returnsRandomData,
    deletePins,
    processingRequests,
    showPopUp
  };

})();
