"use strict";
(function () {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 80;
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const address = document.querySelector(`#address`);
  const disabledFormElements = document.querySelectorAll(`.ad-form fieldset, .map__filters select, .map__filters fieldset`);
  const mainPinX =
    parseInt(mainPin.style.left, 10) + Math.round(MAIN_PIN_WIDTH / 2);
  const mainPinY =
    parseInt(mainPin.style.top, 10) + Math.round(MAIN_PIN_HEIGHT);

  const insertPins = window.pin.insertPins;

  let hotels = [];

  const onSuccess = (data) => {
    window.filters.activateFilters(data);
    hotels = data;
    activation();
  };

  const onError = (message) => console.error(message);

  window.load(`https://21.javascript.pages.academy/keksobooking/data`, onSuccess, onError);

  const removeAttributeDisabled = () => {
    for (let i = 0; i < disabledFormElements.length; i++) {
      disabledFormElements[i].removeAttribute(`disabled`);
    }
  };

  const addAttributeDisabled = () => {
    for (let i = 0; i < disabledFormElements.length; i++) {
      disabledFormElements[i].setAttribute(`disabled`, ``);
    }
  };

  const showElements = () => {
    insertPins(hotels);
    removeAttributeDisabled();
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    address.value = `${mainPinX}, ${mainPinY}`;
  };

  const activation = () => {
    mainPin.addEventListener(`mousedown`, function (evt) {
      if (map.classList.contains(`map--faded`) && evt.button === 0) {
        showElements();
      }
    });

    mainPin.addEventListener(`keydown`, function (evt) {
      if (map.classList.contains(`map--faded`) && evt.key === `Enter`) {
        showElements();
      }
    });
  };

  window.main = {
    mainPinX,
    mainPinY,
    disabledFormElements,
    addAttributeDisabled,
    hotels
  };
})();
