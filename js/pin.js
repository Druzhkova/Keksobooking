'use strict';

(function () {
  const withPin = 50;
  const renderCard = window.card.renderCard;
  const hotels = window.data.hotels;
  // функция рендеринга метки объявления
  const renderPins = (index) => {
    // шаблон метки объявления
    const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    // записываем шаблон в переменную
    const pin = pinTemplate.cloneNode(true);

    const avatarImage = pin.querySelector('img');
    pin.style.left = `${hotels[index].location.x + (withPin / 2)}px`;
    pin.style.top = `${hotels[index].location.y}px`;
    pin.setAttribute('hidden', 'true');
    avatarImage.src = hotels[index].author.avatar;
    avatarImage.alt = hotels[index].offer.title;

    pin.addEventListener('click', () => {
      const prevCard = document.querySelector('.map__card');
      if (prevCard) {
        // удаляем модальное окно с информацией об объявлении, если есть
        window.util.removeElement(prevCard);
      }
      // передаем данные, конкретного блока которые можно отрисовать
      renderCard(index);
    });

    return pin;
  };

  window.pin = {
    renderPins,
  };

})();


