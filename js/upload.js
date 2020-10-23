'use strict';

(function () {
  const url = 'https://21.javascript.pages.academy/keksobooking';

  window.upload = (data, onSuccess, onError) => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 400) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.open('POST', url);
    xhr.send(data);
  };
})();
