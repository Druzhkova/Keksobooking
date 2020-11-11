'use strict';

(function () {
  const locationMainPin = { // координаты main pin
    x: 570,
    y: 375
  };

  const adForm = document.querySelector(`.ad-form`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const resetButton = document.querySelector(`.ad-form__reset`);
  const mapCards = document.querySelectorAll(`.map__card`);
  const map = document.querySelector(`.map`);
  const address = document.querySelector(`#address`);

  const disabledFormElements = window.main.disabledFormElements;
  const popUpError = window.data.popUpError;
  const popUpSuccess = window.data.popUpSuccess;
  const removeElement = window.util.removeElement;
  const showPopUp = window.util.showPopUp;

  const onAdFormChange = () => {
    const roomNumber = document.querySelector(`#room_number`);
    const capacity = document.querySelector(`#capacity`);
    // количество комнат -- количество гостей
    roomNumber.setCustomValidity(``);
    if ((roomNumber.value === `100`) && (capacity.value !== `0`)) {
      roomNumber.setCustomValidity(`100 комнат не для гостей`);
    } else if (roomNumber.value < capacity.value) {
      roomNumber.setCustomValidity(`Количество мест не может превышать количество комнат`);
    } else if (roomNumber.value !== `100` && capacity.value === `0`) {
      roomNumber.setCustomValidity(`Необходио указать количество мест`);
    }

    const price = document.querySelector(`#price`);
    const type = document.querySelector(`#type`);

    if (type.value === `bungalow`) {
      price.placeholder = `0`;
    } else if (type.value === `flat`) {
      price.placeholder = `1000`;
    } else if (type.value === `house`) {
      price.placeholder = `5000`;
    } else if (type.value === `palace`) {
      price.placeholder = `10000`;
    }

    // тип жилья -- цена
    price.setCustomValidity(``);
    if ((type.value === `bungalow`) && (+price.value < 0)) {
      price.setCustomValidity(`Минимальная цена бунгалы за ночь должна быть больше 0`);
    } else if ((type.value === `flat`) && (+price.value < 1000)) {
      price.setCustomValidity(`Минимальная цена квартиры за ночь должна быть больше 1000`);
    } else if ((type.value === `house`) && (+price.value < 5000)) {
      price.setCustomValidity(`Минимальная цена дома за ночь должна быть больше 5000`);
    } else if ((type.value === `palace`) && (+price.value < 10000)) {
      price.setCustomValidity(`Минимальная цена дворца за ночь должна быть больше 10000`);
    }
  };

  // запуск валидации по событию 'change' на форме
  adForm.addEventListener(`change`, onAdFormChange);

  const timeIn = document.querySelector(`#timein`);
  const timeOut = document.querySelector(`#timeout`);

  timeOut.addEventListener(`change`, () => {
    timeIn.value = timeOut.value;
  });

  timeIn.addEventListener(`change`, () => {
    timeOut.value = timeIn.value;
  });

  const addAttributeDisabled = () => {
    disabledFormElements.forEach((elem) => elem.setAttribute(`disabled`, ``));
  };

  const returnToInitialState = () => {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    addAttributeDisabled();
    resetForms();
    const prevCard = document.querySelector(`.map__card`);
    if (prevCard) {
      // удаляем модальное окно с информацией об объявлении, если есть
      removeElement(prevCard);
    }
    window.util.deletePins();
    address.value = `${locationMainPin.x} ${locationMainPin.y}`;
    mainPin.style.left = `${locationMainPin.x}px`;
    mainPin.style.top = `${locationMainPin.y}px`;
  };

  resetButton.addEventListener(`click`, () => returnToInitialState());

  const closePopUp = () => {
    if (!popUpError.classList.contains(`hidden`)) {
      popUpError.classList.add(`hidden`);
    } else if (!popUpSuccess.classList.contains(`hidden`)) {
      popUpSuccess.classList.add(`hidden`);
    }
  };

  const resetForms = () => {
    const forms = document.querySelectorAll(`form`);
    forms.forEach((elem) => elem.reset());
  };

  const onSuccess = () => {
    returnToInitialState();
    showPopUp(popUpSuccess);
  };

  const onError = () => {
    showPopUp(popUpError);

    const errorButton = popUpError.querySelector(`.error__button`);
    errorButton.addEventListener(`click`, () => closePopUp());
  };

  adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    window.upload(new FormData(adForm), onSuccess, onError);

    document.addEventListener(`keydown`, (event) => window.util.isEscEvent(event, closePopUp));
    document.addEventListener(`click`, () => closePopUp());
  });

  window.form = {
    mainPin,
    mapCards,
  };

})();
