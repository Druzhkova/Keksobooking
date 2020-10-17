'use strict';

(function () {
  // Заполнение поля адреса
  const address = window.main.address;
  const adForm = window.main.adForm;
  const mainPin = window.main.mainPin;
  const pins = document.getElementsByClassName('map__pin');
  const mainPinX = window.main.mainPinX;
  const mainPinY = window.main.mainPinY;
  const resetButton = document.querySelector('.ad-form__reset');
  const mapCards = document.querySelectorAll('.map__card');
  const addAttributeDisabled = window.main.addAttributeDisabled;

  const removeElement = window.util.removeElement;
  const map = window.card.map;

  address.value = `${mainPinX}, ${mainPinY}`;

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

    const price = document.querySelector('#price');
    const type = document.querySelector('#type');
    // тип жилья -- цена
    price.setCustomValidity('');
    if ((type.value === 'bungalow') && (+price.value < 0)) {
      price.setCustomValidity('Минимальная цена бунгалы за ночь должна быть больше 0');
    } else if ((type.value === 'flat') && (+price.value < 1000)) {
      price.setCustomValidity('Минимальная цена квартиры за ночь должна быть больше 1000');
    } else if ((type.value === 'house') && (+price.value < 5000)) {
      price.setCustomValidity('Минимальная цена дома за ночь должна быть больше 5000');
    } else if ((type.value === 'palace') && (+price.value < 10000)) {
      price.setCustomValidity('Минимальная цена дворца за ночь должна быть больше 10000');
    }
  };

  // запуск валидации по событию 'change' на форме
  adForm.addEventListener('change', onAdFormChange);

  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  resetButton.addEventListener('click', function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    addAttributeDisabled();
    resetForms();
    const prevCard = document.querySelector('.map__card');
    if (prevCard) {
      // удаляем модальное окно с информацией об объявлении, если есть
      removeElement(prevCard);
    }
    for (let i = 1; i < pins.length; i++) {
      pins[i].style.visibility = 'hidden';
    }
  });

  function resetForms() {
    const forms = document.querySelectorAll('form');
    for (let i = 0; i < forms.length; i++) {
      forms[i].reset();
    }
  }

  window.form = {
    mainPin,
    pins,
    mapCards,
  };

})();
