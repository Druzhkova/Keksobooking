'use strict';

(function () {
  const typesHotel = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  const timeCheckIn = ['12:00', '13:00', '14:00'];
  const timeCheckOut = ['12:00', '13:00', '14:00'];
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const addressImages = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  const amountOfObjects = 8;
  const xCoordinateFrom = 130;
  const xCoordinateTo = 630;
  const yCoordinateTo = 1100;

  const returnsRandomData = window.util.returnsRandomData;
  const getRandomNumb = window.util.getRandomNumb;

  const hotels = makeHotelArray();

  function getCoordinateX() {
    return getRandomNumb(0, yCoordinateTo);
  }

  function getCoordinateY() {
    return getRandomNumb(xCoordinateFrom, xCoordinateTo);
  }

  function getHotel(index) {
    let coordinateX = getCoordinateX();
    let coordinateY = getCoordinateY();

    return {
      'author': {
        'avatar': `img/avatars/user0${index}.png`,
      },
      'offer': {
        'title': 'заголовок объявления',
        'address': `${coordinateX}, ${coordinateY}`,
        'price': 10,
        'type': returnsRandomData(Object.keys(typesHotel)),
        'rooms': 10,
        'guests': 10,
        'checkin': returnsRandomData(timeCheckIn),
        'checkout': returnsRandomData(timeCheckOut),
        'features': returnsRandomData(features),
        'description': '',
        'photos': returnsRandomData(addressImages),
      },
      'location': {
        'x': coordinateX,
        'y': coordinateY,
      }
    };
  }

  function makeHotelArray() {
    const array = [];
    for (let i = 1; i < amountOfObjects + 1; i++) {
      array.push(getHotel(i));
    }
    return array;
  }

  window.data = {
    hotels,
    makeHotelArray,
    typesHotel,
    features,
    addressImages,
    getHotel,
  };

})();
