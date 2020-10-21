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
  const housingType = document.querySelector('#housing-type');
  const insertPins = window.pin.insertPins;
  let housingTypeCurrentValue;

  let hotels = [];

  housingType.addEventListener('change', function () {
    const pins = document.querySelectorAll('.map__pin');
    for (let i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
    housingTypeCurrentValue = housingType.value;

    if (housingTypeCurrentValue === 'any') {
      insertPins(hotels);
    } else {
      updateData();
    }
  });

  const updateData = function () {
    housingTypeCurrentValue = housingType.value;
    const sameTypeHotel = hotels.filter(function (hotel) {
      return hotel.offer.type === housingTypeCurrentValue;
    });
    if (sameTypeHotel.length > 5) {
      insertPins(sameTypeHotel.slice(4));
    } else {
      insertPins(sameTypeHotel);
    }
  };

  const onSuccess = function (data) {
    hotels = data;
    activation();
  };

  window.load('https://21.javascript.pages.academy/keksobooking/data', onSuccess, window.util.onError);

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

  const showElements = function () {
    insertPins(hotels);
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    removeAttributeDisabled();
    address.value = `${mainPinX}, ${mainPinY}`;
  };

  function activation() {

    mainPin.addEventListener('mousedown', function (evt) {
      if (map.classList.contains('map--faded') && evt.button === 0) {
        showElements();
      }
    });

    mainPin.addEventListener('keydown', function (evt) {
      if (map.classList.contains('map--faded') && evt.key === 'Enter') {
        showElements();
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
