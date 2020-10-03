'use strict';
// Личный проект: больше деталей (часть 1)

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
const hotels = makeHotelArray();

function returnsRandomData(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumb(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

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

const map = document.querySelector('.map');
map.classList.remove('map--faded');

const hotelTemplate = document.querySelector('#pin').content
.querySelector('.map__pin');

const mapPins = document.querySelector('.map__pins');

hotels.forEach(function (item, i) {
  const hotelElement = hotelTemplate.cloneNode(true);
  const avatarImage = hotelElement.querySelector('img');
  hotelElement.style.left = hotels[i].location.x + 'px';
  hotelElement.style.top = hotels[i].location.y + 'px';
  avatarImage.src = hotels[i].author.avatar;
  avatarImage.alt = hotels[i].offer.title;

  const fragment = document.createDocumentFragment();
  fragment.appendChild(hotelElement);
  mapPins.appendChild(fragment);
});

// Личный проект: больше деталей (часть 2)

let renderCard = function () {
  let userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // записываем массив с данными для первого предложения в переменную
  const firstAd = hotels[0];

  // записываем клонированный шаблон в переменную
  const popupCard = userCardTemplate.cloneNode(true);

  // в элементы карточки popupCard записываем данные из сгенерированного массива
  popupCard.querySelector('.popup__title').textContent = firstAd.offer.title;
  popupCard.querySelector('.popup__text--address').textContent = firstAd.offer.address;
  popupCard.querySelector('.popup__text--price').textContent = `${firstAd.offer.price} ₽/ночь`;
  popupCard.querySelector('.popup__type').textContent = typesHotel[firstAd.offer.type];
  const popupFeatures = popupCard.querySelector('.popup__features');
  const popupPhotos = popupCard.querySelector('.popup__photos');

  // функция выбора окончаний
  const plural = function (n, forms) {
    let id;
    if (n % 10 === 1 && n % 100 !== 11) {
      id = 0;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      id = 1;
    } else {
      id = 2;
    }
    return forms[id] || '';
  };
  const room = plural(firstAd.offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guest = plural(firstAd.offer.guests, ['гостя', 'гостей', 'гостей']);

  popupCard.querySelector('.popup__text--capacity').textContent = `${firstAd.offer.rooms} ${room} для ${firstAd.offer.guests} ${guest}`;
  popupCard.querySelector('.popup__text--time').textContent = `Заезд после ${firstAd.offer.checkin}, выезд до ${firstAd.offer.checkout}`;

  // вывод доступных удобств
  while (popupFeatures.firstChild) {
    popupFeatures.removeChild(popupFeatures.firstChild);
  }

  for (let i = 0; i < features.length; i++) {
    let item = document.createElement('li');
    item.classList.add(`popup__feature`);
    item.classList.add(`popup__feature--${features[i]}`);
    popupFeatures.appendChild(item);
  }

  popupCard.querySelector('.popup__description').textContent = firstAd.offer.description;

  // добавление фотографий в блок popupPhotos
  const img = popupPhotos.querySelector('.popup__photo');
  popupPhotos.removeChild(img);

  let insertedImg;
  for (let num = 0; num < addressImages.length; num++) {
    insertedImg = img.cloneNode(true);
    insertedImg.src = addressImages[num];
    popupPhotos.appendChild(insertedImg);
  }
  popupCard.querySelector('.popup__avatar').src = firstAd.author.avatar;

  return popupCard;
};

// функция вставки карточки в DOM
const insertCard = function () {
  const mapfiltersContainer = map.querySelector('.map__filters-container');
  map.insertBefore(renderCard(), mapfiltersContainer);
};

// вставляем карточку
insertCard();
