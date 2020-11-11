"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const typesHotels = window.data.typesHotels;
  const features = window.data.features;

  // функция рендеринга карточки
  let renderCard = (hotel) => {
    // шаблон модального окно с информацией об объявлении
    let userCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    // записываем шаблон в переменную
    const popupCard = userCardTemplate.cloneNode(true);
    // записываем данные из сгенерированного массива
    popupCard.querySelector(`.popup__title`).textContent = hotel.offer.title;
    popupCard.querySelector(`.popup__text--address`).textContent = hotel.offer.address;
    popupCard.querySelector(`.popup__text--price`).textContent = `${hotel.offer.price} ₽/ночь`;
    popupCard.querySelector(`.popup__type`).textContent = typesHotels[hotel.offer.type];
    const popupFeatures = popupCard.querySelector(`.popup__features`);
    const popupPhotos = popupCard.querySelector(`.popup__photos`);

    const room = choiceOfEnding(hotel.offer.rooms, [`комната`, `комнаты`, `комнат`]);
    const guest = choiceOfEnding(hotel.offer.guests, [`гостя`, `гостей`, `гостей`]);

    popupCard.querySelector(`.popup__text--capacity`).textContent = `${hotel.offer.rooms} ${room} для ${hotel.offer.guests} ${guest}`;
    popupCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;
    // вывод доступных удобств
    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }

    for (let i = 0; i < features.length; i++) {
      let item = document.createElement(`li`);
      item.classList.add(`popup__feature`);
      item.classList.add(`popup__feature--${features[i]}`);
      popupFeatures.appendChild(item);
    }

    popupCard.querySelector(`.popup__description`).textContent = hotel.offer.description;
    // добавление фотографий в блок popupPhotos
    const img = popupPhotos.querySelector(`.popup__photo`);
    popupPhotos.removeChild(img);

    let insertedImg;

    for (let j = 0; j < hotel.offer.photos.length; j++) {
      insertedImg = img.cloneNode(true);
      insertedImg.src = hotel.offer.photos[j];
      popupPhotos.appendChild(insertedImg);
    }

    popupCard.querySelector(`.popup__avatar`).src = hotel.author.avatar;

    const buttonClose = popupCard.querySelector(`.popup__close`);
    // закрытие по нажатию иконки закрытия
    buttonClose.addEventListener(`click`, () => removePopup());
    // закрытие окна по нажатию кнопки ENTER, когда кнопка закрытия в фокусе
    buttonClose.addEventListener(`keydown`, (evt) => window.util.isEnterEvent(evt, removePopup));
    // закрытие окна по нажатию кнопки ESCAPE
    document.addEventListener(`keydown`, (evt) => window.util.isEscEvent(evt, removePopup));

    const removePopup = () => window.util.removeElement(popupCard);
    map.appendChild(popupCard);
    return popupCard;
  };

  // функция выбора окончаний
  const choiceOfEnding = (n, forms) => {
    let id;
    if (n % 10 === 1 && n % 100 !== 11) {
      id = 0;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      id = 1;
    } else {
      id = 2;
    }
    return forms[id] || ``;
  };

  window.card = {
    renderCard,
  };
})();
