'use strict';

(function () {
  const map = document.querySelector('.map');

  const typesHotel = window.data.typesHotel;
  const features = window.data.features;
  const addressImages = window.data.addressImages;
  const hotels = window.data.hotels;

  // функция рендеринга карточки
  let renderCard = function (index) {
    // шаблон модального окно с информацией об объявлении
    let userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    // записываем шаблон в переменную
    const popupCard = userCardTemplate.cloneNode(true);
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

    const buttonClose = popupCard.querySelector('.popup__close');
    // закрытие по нажатию иконки закрытия
    buttonClose.addEventListener('click', function () {
      removePopup();
    });
    // закрытие окна по нажатию кнопки ENTER, когда кнопка закрытия в фокусе
    buttonClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, removePopup);
    });
    // закрытие окна по нажатию кнопки ESCAPE
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removePopup);
    });

    function removePopup() {
      window.util.removeElement(popupCard);
    }

    map.appendChild(popupCard);
  };

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

  window.card = {
    map,
    renderCard
  };

})();
