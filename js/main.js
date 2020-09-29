let typesHotel= ['palace', 'flat', 'house', 'bungalow'];
let timeCheckIn = ['12:00', '13:00', '14:00'];
let timeCheckOut = ['12:00', '13:00', '14:00'];
let features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let addressImages = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
let hotels = makeHotelArray();

function returnsRandomData (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

function getRandomNumb(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function getHotel(index) {
  return {
    'author': {
      'avatar': `img/avatars/user0${index}.png`,
    },
    'offer': {
      'title': 'заголовок объявления',
      'address': `${location.x}, ${location.y}`,
      'price': price,
      'type': returnsRandomData(typesHotel),
      'rooms': 10,
      'guests': 10,
      'checkin': returnsRandomData(timeCheckIn),
      'checkout': returnsRandomData(timeCheckOut),
      'features': returnsRandomData(features),
      'description': '',
      'photos': returnsRandomData(addressImages),
    },
    'location': {
      'x': getRandomNumb(0, 1100),
      'y': getRandomNumb(130, 630),
    }
  }
};

function makeHotelArray() {
  let array = [];
  for (let i = 1; i < 9; i++) {
    array.push(getHotel(i));
  }
  return array;
};

let map = document.querySelector('.map')
map.classList.remove('map--faded');

let hotelTemplate = document.querySelector('#pin').content
.querySelector('.map__pin');

hotels.forEach(function(item, i){
  let hotelElement = hotelTemplate.cloneNode(true);
  let avatarImage = hotelElement.querySelector('img');
  hotelElement.style.left = hotels[i].location.x + 'px';
  hotelElement.style.top = hotels[i].location.y + 'px';
  avatarImage.src = hotels[i].author.avatar;
  avatarImage.alt = hotels[i].offer.title;

  let fragment = document.createDocumentFragment();
  fragment.appendChild(hotelElement);
  map.appendChild(fragment);
});
