'use strict';
(function () {
  const map = window.card.map;
  const renderCard = window.card.renderCard;
  const pins = window.form.pins;
  const adForm = window.form.adForm;
  const disableElements = window.form.disableElements;
  const disabledFormElements = window.form.disabledFormElements;
  const mainPin = window.form.mainPin;
  const mainPinX = window.form.mainPinX;
  const mainPinY = window.form.mainPinY;
  const mapCards = window.form.mapCards;

  const removeAttribute = function (elements, attribute) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].removeAttribute(attribute, '');
    }
  };

  const address = window.form.address;

  const showElements = function () {
    removeAttribute(disabledFormElements, 'disabled');
    removeAttribute(mapCards, 'hidden');
    removeAttribute(pins, 'hidden');
    renderCard(1);
  };
  // по дефолту запущена, переопределяется при активации
  disableElements();
  let makeHotelArray = window.data.makeHotelArray;
  // функция активации страницы
  const activation = function () {
    makeHotelArray();
    showElements();
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    mainPin.setAttribute('disabled', '');

    address.value = `${mainPinX}, ${mainPinY}`;
  };

  let notActivatedYet = true;
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button !== 0) {
      return;
    } else {
      activation();
      notActivatedYet = false;
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (notActivatedYet === false) {
      return;
    } else if (evt.key === 'Enter') {
      activation();
      notActivatedYet = false;
    }
  });

})();
