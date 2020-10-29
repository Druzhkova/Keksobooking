'use strict';

(function () {
  window.load = function (url, onSuccess, onError) {
    window.util.processingRequests(url, onSuccess, onError, 'GET');
  };

})();
