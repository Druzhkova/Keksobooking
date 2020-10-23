'use strict';

(function () {
  const escKeyCode = 27;
  const enterKeyCode = 13;

  const onError = (message) => console.error(message);

  const isEscEvent = (evt, action) => {
    if (evt.keyCode === escKeyCode) {
      action();
    }
  };

  const isEnterEvent = (evt, action) => {
    if (evt.keyCode === enterKeyCode) {
      action();
    }
  };

  const returnsRandomData = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomNumb = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const removeElement = (element) => element.remove();

  const deletePins = () => {
    const pins = document.querySelectorAll('.map__pin');

    for (let i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
  };

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
