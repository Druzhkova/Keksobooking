'use strict';

(function () {
  const map = document.querySelector('.map');
  const getRandomNumb = window.util.getRandomNumb;
  const renderCard = window.card.renderCard;

  const X_COORDINATE_FROM = 130;
  const X_COORDINATE_TO = 630;
  const Y_COORDINATE_TO = 1100;
  const MAX_PINS = 5;

  const getCoordinateX = () => getRandomNumb(0, Y_COORDINATE_TO);
  const getCoordinateY = () => getRandomNumb(X_COORDINATE_FROM, X_COORDINATE_TO);

  // функция рендеринга метки объявления
  const renderPins = (hotel) => {
    // шаблон метки объявления
    const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    // записываем шаблон в переменную
    const pin = pinTemplate.cloneNode(true);

    const avatarImage = pin.querySelector('img');
    pin.style.left = `${getCoordinateX()}px`;
    pin.style.top = `${getCoordinateY()}px`;
    avatarImage.src = hotel.author.avatar;
    avatarImage.alt = hotel.offer.title;

    pin.addEventListener('click', () => {
      const prevCard = document.querySelector('.map__card');
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


