'use strict';

(function () {
  const blockMain = document.querySelector(`main`);

  const typesHotels = {
    palace: `Дворец`,
    flat: `Квартира`,
    bungalo: `Бунгало`,
    house: `Дом`
  };

  const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`); // шаблон
  const popUpSuccess = successTemplate.cloneNode(true); // записываем шаблон в переменную
  const fragment = document.createDocumentFragment(); // создаем фрагмент
  fragment.appendChild(popUpSuccess);
  blockMain.appendChild(fragment); // вставляем фрагмент в html
  popUpSuccess.classList.add(`hidden`);


  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const popUpError = errorTemplate.cloneNode(true);
  fragment.appendChild(popUpError);
  blockMain.appendChild(fragment);
  popUpError.classList.add(`hidden`);

  window.data = {
    features,
    typesHotels,
    popUpError,
    popUpSuccess
  };

})();
