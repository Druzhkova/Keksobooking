'use strict';

(function () {
  const MAX_PINS = 5;
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 40;
  const MAIN_PIN_WIDTH = 65;
  const POINTER_HEIGHT = 22;

  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const address = document.querySelector(`#address`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`); // шаблон метки объявления

  const locationXY = {
    MIN_X: MAIN_PIN_WIDTH / 2,
    MAX_X: (map.clientWidth - MAIN_PIN_WIDTH),
    MIN_Y: 130,
    MAX_Y: 630
  };

  const locationMainPin = { // координаты main pin
    x: 570,
    y: 375
  };


  // внесения координат в форму
  const getAddress = () => {
    address.value = `${locationMainPin.x} ${locationMainPin.y}`;
  };

  getAddress();

  const onPinMove = (evt) => {
    evt.preventDefault();

    let initialCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: initialCoords.x - moveEvt.clientX,
        y: initialCoords.y - moveEvt.clientY
      };

      initialCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const coordX = mainPin.offsetLeft - shift.x;
      const coordY = mainPin.offsetTop - shift.y;
      const coordForFormX = coordX + PIN_WIDTH / 2;
      const coordForFormY = coordY + PIN_HEIGHT / 2 + POINTER_HEIGHT;

      if (coordX >= (locationXY.MIN_X - PIN_WIDTH / 2) && coordX <= (locationXY.MAX_X - PIN_WIDTH / 2) && coordY >= (locationXY.MIN_Y - PIN_WIDTH / 2 - POINTER_HEIGHT) && coordY <= (locationXY.MAX_Y - PIN_WIDTH / 2 - POINTER_HEIGHT)) {
        mainPin.style.left = coordX + `px`;
        mainPin.style.top = coordY + `px`;
        locationMainPin.x = coordForFormX;
        locationMainPin.y = coordForFormY;
      }
      getAddress();
    };

    const mouseUpHandler = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, mouseMoveHandler);
      document.removeEventListener(`mouseup`, mouseUpHandler);
    };

    document.addEventListener(`mousemove`, mouseMoveHandler);
    document.addEventListener(`mouseup`, mouseUpHandler);
  };

  mainPin.addEventListener(`mousedown`, onPinMove);

  const getPinWidth = (x) => {
    return x - PIN_WIDTH / 2;
  };

  const getPinHeight = (y) => {
    return y - PIN_HEIGHT;
  };

  // функция рендеринга метки объявления
  const renderPins = (hotel) => {
    // записываем шаблон в переменную
    const pin = pinTemplate.cloneNode(true);

    const pinImage = pin.querySelector(`img`);
    pinImage.width = PIN_WIDTH;
    pinImage.height = PIN_HEIGHT;
    pin.style.left = `${getPinWidth(hotel.location.x)}px`;
    pin.style.top = `${getPinHeight(hotel.location.y)}px`;
    pinImage.src = hotel.author.avatar;
    pinImage.alt = hotel.offer.title;

    pin.addEventListener(`click`, () => {
      const prevCard = document.querySelector(`.map__card`);
      if (prevCard) {
        // удаляем модальное окно с информацией об объявлении, если есть
        window.util.removeElement(prevCard);
      }
      // передаем данные, конкретного блока которые можно отрисовать
      window.card.render(hotel);
    });
    return pin;
  };

  function insertPins(data) {
    // создаем фрагмент
    const fragment = document.createDocumentFragment();
    // вставляем в фрагмент пины
    let dataLength = data.length >= MAX_PINS ? MAX_PINS : data.length;
    for (let i = 0; i < dataLength; i++) {
      fragment.appendChild(renderPins(data[i]));
    }
    // вставляем фрагмент в html
    map.appendChild(fragment);
  }

  window.pin = {
    renderPins,
    insertPins,
    getAddress
  };

})();


