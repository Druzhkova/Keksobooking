'use strict';

(function () {
  // Заполнение поля адреса
  const address = document.querySelector('#address');
  const adForm = document.querySelector('.ad-form');
  const mainPin = document.querySelector('.map__pin--main');
  const pins = document.querySelectorAll('.map__pin');
  const mainPinWidth = 65;
  const mainPinHeight = 80;
  const mainPinX = parseInt((mainPin.style.left), 10) + Math.round(mainPinWidth / 2);
  const mainPinY = parseInt((mainPin.style.top), 10) + Math.round(mainPinHeight);
  const resetButton = document.querySelector('.ad-form__reset');
  const disabledFormElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');
  const mapCards = document.querySelectorAll('.map__card');

  const removeElement = window.util.removeElement;
  const map = window.card.map;

  const addAttribute = function (elements, attribute) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute(attribute, '');
    }
  };

  address.value = `${mainPinX}, ${mainPinY}`;
  // обработчик события 'change' на форме
  const onAdFormChange = function () {
    const roomNumber = document.querySelector('#room_number');
    const capacity = document.querySelector('#capacity');
    // количество комнат -- количество гостей
    roomNumber.setCustomValidity('');
    if ((roomNumber.value === '100') && (capacity.value !== '0')) {
      roomNumber.setCustomValidity('100 комнат не для гостей');
    } else if (roomNumber.value < capacity.value) {
      roomNumber.setCustomValidity('Количество мест не может превышать количество комнат');
    } else if (roomNumber.value !== '100' && capacity.value === '0') {
      roomNumber.setCustomValidity('Необходио указать количество мест');
    }
  };

  const price = document.querySelector('#price');
  const type = document.querySelector('#type');

  if (type.value === 'flat' && +price.value < 1000) {
    price.setCustomValidity('Минимальная цена квартиры за ночь должна быть больше 1000');
  }

  type.addEventListener('change', function () {
    if (type.value === 'bungalow') {
      if (+price.value < 0) {
        price.setCustomValidity('Минимальная цена бунгалы за ночь должна быть больше 0');
      } else {
        price.setCustomValidity('');
      }
    } else if (type.value === 'flat') {
      if (+price.value < 1000) {
        price.setCustomValidity('Минимальная цена квартиры за ночь должна быть больше 1000');
      } else {
        price.setCustomValidity('');
      }
    } else if (type.value === 'house') {
      if (+price.value < 5000) {
        price.setCustomValidity('Минимальная цена дома за ночь должна быть больше 5000');
      } else {
        price.setCustomValidity('');
      }
    } else if (type.value === 'palace') {
      if (+price.value < 10000) {
        price.setCustomValidity('Минимальная цена дворца за ночь должна быть больше 10000');
      } else {
        price.setCustomValidity('');
      }
    }
  });

  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  // запуск валидации по событию 'change' на форме
  adForm.addEventListener('change', onAdFormChange);

  const disableElements = function () {
    addAttribute(disabledFormElements, 'disabled');
    addAttribute(mapCards, 'hidden');
  };

  resetButton.addEventListener('click', function () {
    resetForms();
    disableElements();
    addAttribute(pins, 'hidden');
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    document.querySelector('.map__pin--main').removeAttribute('hidden', 'true');
    const prevCard = document.querySelector('.map__card');
    if (prevCard) {
      // удаляем модальное окно с информацией об объявлении, если есть
      removeElement(prevCard);
    }
  });

  function resetForms() {
    const forms = document.querySelectorAll('form');
    for (let i = 0; i < forms.length; i++) {
      forms[i].reset();
    }
  }

  window.form = {
    adForm,
    address,
    mainPin,
    disableElements,
    pins,
    mainPinX,
    mainPinY,
    mapCards,
    disabledFormElements
  };

})();
