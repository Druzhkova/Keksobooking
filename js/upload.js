'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = (data, onSuccess, onError) => {
    window.util.processingRequests(URL, onSuccess, onError, `POST`, data);
  };

})();
