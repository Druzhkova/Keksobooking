'use strict';

(function () {
  const typesHotel = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.data = {
    features,
    typesHotel
  };
})();
