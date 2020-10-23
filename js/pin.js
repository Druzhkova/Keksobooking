'use strict';

(function () {
  const renderCard = window.card.renderCard;
  const map = window.card.map;
  const getRandomNumb = window.util.getRandomNumb;

  const xCoordinateFrom = 130;
  const xCoordinateTo = 630;
  const yCoordinateTo = 1100;
  const maxPins = 5;

  const getCoordinateX = () => getRandomNumb(0, yCoordinateTo);
  const getCoordinateY = () => getRandomNumb(xCoordinateFrom, xCoordinateTo);

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
    let dataLength = data.length >= maxPins ? maxPins : data.length;
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


