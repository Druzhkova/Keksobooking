'use strict';
(function () {
  const map = window.card.map;
  const adForm = document.querySelector('.ad-form');
  const mainPin = document.querySelector('.map__pin--main');
  const mainPinWidth = 65;
  const mainPinHeight = 80;
  const mainPinX = parseInt((mainPin.style.left), 10) + Math.round(mainPinWidth / 2);
  const mainPinY = parseInt((mainPin.style.top), 10) + Math.round(mainPinHeight);
  const address = document.querySelector('#address');
  const disabledFormElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');

  const insertPins = window.pin.insertPins;

  const onError = function (message) {
    console.error(message);
  };

  const onSuccess = function (data) {
    activation(data);
  };

  window.load('https://21.javascript.pages.academy/keksobooking/data', onSuccess, onError);

  function removeAttributeDisabled() {
    for (let i = 0; i < disabledFormElements.length; i++) {
      disabledFormElements[i].removeAttribute('disabled');
    }
  }

  function addAttributeDisabled() {
    for (let i = 0; i < disabledFormElements.length; i++) {
      disabledFormElements[i].setAttribute('disabled', '');
    }
  }

  const showElements = function (data) {
    insertPins(data);
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    removeAttributeDisabled();
    address.value = `${mainPinX}, ${mainPinY}`;
  };

  function activation(data) {

    mainPin.addEventListener('mousedown', function (evt) {
      if (map.classList.contains('map--faded') && evt.button === 0) {
        showElements(data);
      }
    });
  }

  window.main = {
    adForm,
    mainPin,
    mainPinX,
    mainPinY,
    address,
    disabledFormElements,
    addAttributeDisabled,
  };

})();
