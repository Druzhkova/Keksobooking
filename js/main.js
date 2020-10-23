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
  const mapForm = document.querySelector('.map__filters');
  const insertPins = window.pin.insertPins;
  let housingTypeCurrentValue;

  let hotels = [];

  mapForm.addEventListener('change', () => {
    window.util.deletePins();
    housingTypeCurrentValue = housingType.value;

    if (housingTypeCurrentValue === 'any') {
      insertPins(hotels);
    } else {
      updateData();
    }
  });

  const updateData = () => {
    housingTypeCurrentValue = housingType.value;
    const sameTypeHotel = hotels.filter(function (hotel) {
      return hotel.offer.type === housingTypeCurrentValue;
    });

    insertPins(sameTypeHotel);
  };

  const onSuccess = (data) => {
    hotels = data;
    activation();
  };

  window.load('https://21.javascript.pages.academy/keksobooking/data', onSuccess, window.util.onError);

  const removeAttributeDisabled = () => {
    for (let i = 0; i < disabledFormElements.length; i++) {
      disabledFormElements[i].removeAttribute('disabled');
    }
  };

  const addAttributeDisabled = () => {
    for (let i = 0; i < disabledFormElements.length; i++) {
      disabledFormElements[i].setAttribute('disabled', '');
    }
  };

  const showElements = () => {
    insertPins(hotels);
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    removeAttributeDisabled();
    address.value = `${mainPinX}, ${mainPinY}`;
  };

  const activation = () => {

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
  };

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
