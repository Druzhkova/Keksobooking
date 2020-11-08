'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const address = document.querySelector(`#address`);
  const renderCard = window.card.renderCard;

  const Y_COORDINATE_FROM = 130;
  const Y_COORDINATE_TO = 630;
  const MAX_PINS = 5;

  const initialCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  const pinCoordinates = Object.assign({}, initialCoords);

  const dragAndDrop = (container, element, coordinates) => {
    element.addEventListener(`mousedown`, (evt) => {
      evt.preventDefault();
      const mouseMoveHandler = (moveEvt) => {
        moveEvt.preventDefault();
        let x = moveEvt.clientX - container.offsetLeft;
        let y = moveEvt.clientY - container.offsetTop;

        if (y < Y_COORDINATE_TO + (element.clientHeight / 2) && y > Y_COORDINATE_FROM - (element.clientHeight / 2)) {
          coordinates.y = y;
        }

        if (x > (element.clientWidth / 2) && x < container.clientWidth - (element.clientWidth / 2)) {
          coordinates.x = x;
        }

        element.style.top = Math.round(coordinates.y - (element.clientHeight / 2)) + `px`;
        element.style.left = Math.round(coordinates.x - (element.clientWidth / 2)) + `px`;

        address.value = `${element.style.left}, ${element.style.top}`;
      };

      const mouseUpHandler = (upEvt) => {
        upEvt.preventDefault();
        document.removeEventListener(`mousemove`, mouseMoveHandler);
        document.removeEventListener(`mouseup`, mouseUpHandler);
      };

      document.addEventListener(`mousemove`, mouseMoveHandler);
      document.addEventListener(`mouseup`, mouseUpHandler);
    });
  };

  dragAndDrop(map, mainPin, pinCoordinates);

  // функция рендеринга метки объявления
  const renderPins = (hotel) => {
    // шаблон метки объявления
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    // записываем шаблон в переменную
    const pin = pinTemplate.cloneNode(true);

    const avatarImage = pin.querySelector(`img`);
    pin.style.left = `${hotel.location.x}px`;
    pin.style.top = `${hotel.location.y}px`;
    avatarImage.src = hotel.author.avatar;
    avatarImage.alt = hotel.offer.title;

    pin.addEventListener(`click`, () => {
      const prevCard = document.querySelector(`.map__card`);
      if (prevCard) {
        // удаляем модальное окно с информацией об объявлении, если есть
        window.util.removeElement(prevCard);
      }
      // передаем данные, конкретного блока которые можно отрисовать
      renderCard(hotel);
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
    insertPins
  };

})();


