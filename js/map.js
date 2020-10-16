'use strict';

(function () {
  const map = window.card.map;
  const hotels = window.data.hotels;
  const renderPins = window.pin.renderPins;

  // создаем фрагмент
  const fragment = document.createDocumentFragment();

  // вставляем в фрагмент пины
  for (let i = 0; i < hotels.length; i++) {
    fragment.appendChild(renderPins(i));
  }

  // вставляем фрагмент в html
  map.appendChild(fragment);

})();
