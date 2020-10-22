'use strict';

(function () {
  const escKeyCode = 27;
  const enterKeyCode = 13;

  const onError = function (message) {
    console.error(message);
  };


  function isEscEvent(evt, action) {
    if (evt.keyCode === escKeyCode) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.keyCode === enterKeyCode) {
      action();
    }
  }

  function returnsRandomData(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomNumb(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function removeElement(element) {
    element.remove();
  }

  function deletePins() {
    const pins = document.querySelectorAll('.map__pin');

    for (let i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
  }

  window.util = {
    isEscEvent,
    isEnterEvent,
    removeElement,
    returnsRandomData,
    getRandomNumb,
    onError,
    deletePins
  };
})();
