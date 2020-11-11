"use strict";
(function () {
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const disabledFormElements = document.querySelectorAll(`.ad-form fieldset, .map__filters select, .map__filters fieldset`);

  const insertPins = window.pin.insertPins;
  const popUpError = window.data.popUpError;
  const showPopUp = window.util.showPopUp;
  const getAddress = window.pin.getAddress;

  let hotels = [];

  const onSuccess = (data) => {
    window.filters.activate(data);
    hotels = data;
    activatePage();
  };

  const closePopUp = () => {
    if (!popUpError.classList.contains(`hidden`)) {
      popUpError.classList.add(`hidden`);
    }
  };

  const onError = (message) => {
    showPopUp(popUpError);
    const errorMessage = popUpError.querySelector(`.error__message`);
    errorMessage.textContent = `${message}`;

    const errorButton = popUpError.querySelector(`.error__button`);
    errorButton.addEventListener(`click`, () => closePopUp());
  };

  window.load(`https://21.javascript.pages.academy/keksobooking/data`, onSuccess, onError);

  const removeAttributeDisabled = () => {
    disabledFormElements.forEach((elem) => elem.removeAttribute(`disabled`));
  };

  const showElements = () => {
    insertPins(hotels);
    removeAttributeDisabled();
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    getAddress();
  };

  const activatePage = () => {
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
    disabledFormElements,
    hotels
  };
})();
