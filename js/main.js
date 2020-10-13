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
const map = document.querySelector('.map');
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

const withPin = 50;
// const hightPin = 70;

// функция рендеринга метки объявления
const renderPins = (index) => {
  const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // шаблон метки объявления
  const pin = pinTemplate.cloneNode(true); // записываем шаблон в переменную

  const avatarImage = pin.querySelector('img');
  pin.style.left = `${hotels[index].location.x + (withPin / 2)}px`;
  pin.style.top = `${hotels[index].location.y}px`;
  pin.setAttribute('hidden', 'true');
  avatarImage.src = hotels[index].author.avatar;
  avatarImage.alt = hotels[index].offer.title;

  pin.addEventListener('click', () => {
    const prevCard = document.querySelector('.map__card');
    if (prevCard) {
      prevCard.remove(); // удаляем модальное окно с информацией об объявлении, если есть
    }
    renderCard(index); // передаем данные, конкретного блока которые можно отрисовать
  });

  pin.addEventListener('keydown', function (evt) { // открытие окна по нажатию кнопки ENTER, когда кнопка в фокусе
    if (evt.key === 'Enter') {
      renderPins(index);
    }
  });

  return pin;
};

// функция рендеринга карточки
let renderCard = function (index) {
  let userCardTemplate = document.querySelector('#card').content.querySelector('.map__card'); // шаблон модального окно с информацией об объявлении
  const popupCard = userCardTemplate.cloneNode(true); // записываем шаблон в переменную

  // записываем данные из сгенерированного массива
  popupCard.querySelector('.popup__title').textContent = hotels[index].offer.title;
  popupCard.querySelector('.popup__text--address').textContent = hotels[index].offer.address;
  popupCard.querySelector('.popup__text--price').textContent = `${hotels[index].offer.price} ₽/ночь`;
  popupCard.querySelector('.popup__type').textContent = typesHotel[hotels[index].offer.type];
  const popupFeatures = popupCard.querySelector('.popup__features');
  const popupPhotos = popupCard.querySelector('.popup__photos');

  const room = plural(hotels[index].offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guest = plural(hotels[index].offer.guests, ['гостя', 'гостей', 'гостей']);

  popupCard.querySelector('.popup__text--capacity').textContent = `${hotels[index].offer.rooms} ${room} для ${hotels[index].offer.guests} ${guest}`;
  popupCard.querySelector('.popup__text--time').textContent = `Заезд после ${hotels[index].offer.checkin}, выезд до ${hotels[index].offer.checkout}`;

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

  popupCard.querySelector('.popup__description').textContent = hotels[index].offer.description;

  // добавление фотографий в блок popupPhotos
  const img = popupPhotos.querySelector('.popup__photo');
  popupPhotos.removeChild(img);

  let insertedImg;
  for (let num = 0; num < addressImages.length; num++) {
    insertedImg = img.cloneNode(true);
    insertedImg.src = addressImages[num];
    popupPhotos.appendChild(insertedImg);
  }

  popupCard.querySelector('.popup__avatar').src = hotels[index].author.avatar;

  const buttonClose = popupCard.querySelector('.popup__close'); // закрытие по нажатию иконки закрытия
  buttonClose.addEventListener('click', function () {
    popupCard.remove();
  });

  buttonClose.addEventListener('keydown', function (evt) { // закрытие окна по нажатию кнопки ENTER, когда кнопка закрытия в фокусе
    if (evt.key === 'Enter') {
      popupCard.remove();
    }
  });

  document.addEventListener('keydown', function (evt) { // закрытие окна по нажатию кнопки ESCAPE
    if (evt.key === 'Escape') {
      evt.preventDefault();
      popupCard.remove();
    }
  });

  map.appendChild(popupCard);
};

// создаем фрагмент
const fragment = document.createDocumentFragment();

// вставляем в фрагмент пины
for (let i = 0; i < hotels.length; i++) {
  fragment.appendChild(renderPins(i));
}

// вставляем фрагмент в html
map.appendChild(fragment);

// функция выбора окончаний
function plural(n, forms) {
  let id;
  if (n % 10 === 1 && n % 100 !== 11) {
    id = 0;
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    id = 1;
  } else {
    id = 2;
  }
  return forms[id] || '';
}

const pins = document.querySelectorAll('.map__pin');

const adForm = document.querySelector('.ad-form');
const disabledFormElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');
const mapCards = document.querySelectorAll('.map__card');
const mainPin = document.querySelector('.map__pin--main');
const resetButton = document.querySelector('.ad-form__reset');

const addAttribute = function (elements, attribute) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute(attribute, '');
  }
};

const removeAttribute = function (elements, attribute) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].removeAttribute(attribute, '');
  }
};

const disableElements = function () {
  addAttribute(disabledFormElements, 'disabled');
  addAttribute(mapCards, 'hidden');
};

const showElements = function () {
  removeAttribute(disabledFormElements, 'disabled');
  removeAttribute(mapCards, 'hidden');
  removeAttribute(pins, 'hidden');
  renderCard(1);
};

function resetForms() {
  const forms = document.querySelectorAll('form');
  for (let i = 0; i < forms.length; i++) {
    forms[i].reset();
  }
}

disableElements(); // по дефолту запущена, переопределяется при активации

// функция активации страницы
const activation = function () {
  makeHotelArray();
  showElements();
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  mainPin.setAttribute('disabled', '')

  address.value = `${mainPinX}, ${mainPinY}`;
};

let notActivatedYet = true;
mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button !== 0) {
    return;
  } else {
    activation();
    notActivatedYet = false;
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (notActivatedYet === false) {
    return;
  } else if (evt.key === 'Enter') {
    activation();
    notActivatedYet = false;
  }
});

resetButton.addEventListener('click', function () {
  resetForms();
  disableElements();
  addAttribute(pins, 'hidden');
  adForm.classList.add('ad-form--disabled');
  map.classList.add('map--faded');
  document.querySelector('.map__pin--main').removeAttribute('hidden', 'true');
  const prevCard = document.querySelector('.map__card');
  if (prevCard) {
    prevCard.remove(); // удаляем модальное окно с информацией об объявлении, если есть
  }
});

// Заполнение поля адреса
const address = document.querySelector('#address');

const mainPinWidth = 65;
const mainPinHeight = 80;
const mainPinX = parseInt((mainPin.style.left), 10) + Math.round(mainPinWidth / 2);
const mainPinY = parseInt((mainPin.style.top), 10) + Math.round(mainPinHeight);

address.value = `${mainPinX}, ${mainPinY}`;

// обработчик события 'change' на форме
const onAdFormChange = function () {
  const roomNumber = document.querySelector('#room_number');
  const capacity = document.querySelector('#capacity');

  // количество комнат -- количество гостей
  roomNumber.setCustomValidity('');
  if ((roomNumber.value === '100') && (capacity.value !== '0')) {
    roomNumber.setCustomValidity('100 комнат не для гостей');
  } else if (roomNumber.value < capacity.value) {
    roomNumber.setCustomValidity('Количество мест не может превышать количество комнат');
  } else if (roomNumber.value !== '100' && capacity.value === '0') {
    roomNumber.setCustomValidity('Необходио указать количество мест');
  }
};

const price = document.querySelector('#price');
const type = document.querySelector('#type');

if (type.value === 'flat' && +price.value < 1000) {
  price.setCustomValidity('Минимальная цена квартиры за ночь должна быть больше 1000');
}

type.addEventListener('change', function () {
  if (type.value === 'bungalow') {
    if (+price.value < 0) {
      price.setCustomValidity('Минимальная цена бунгалы за ночь должна быть больше 0');
    } else {
      price.setCustomValidity('');
    }
  } else if (type.value === 'flat') {
    if (+price.value < 1000) {
      price.setCustomValidity('Минимальная цена квартиры за ночь должна быть больше 1000');
    } else {
      price.setCustomValidity('');
    }
  } else if (type.value === 'house') {
    if (+price.value < 5000) {
      price.setCustomValidity('Минимальная цена дома за ночь должна быть больше 5000');
    } else {
      price.setCustomValidity('');
    }
  } else if (type.value === 'palace') {
    if (+price.value < 10000) {
      price.setCustomValidity('Минимальная цена дворца за ночь должна быть больше 10000');
    } else {
      price.setCustomValidity('');
    }
  }
});

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

timeOut.addEventListener('change', function () {
  timeIn.value = timeOut.value;
});
timeIn.addEventListener('change', function () {
  timeOut.value = timeIn.value;
});

// запуск валидации по событию 'change' на форме
adForm.addEventListener('change', onAdFormChange);
