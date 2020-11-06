"use strict";
(function () {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 80;
  // const LOW_HOUSING_PRICE = 10000;
  // const HIGH_HOUSING_PRICE = 50000;
  const map = document.querySelector(".map");
  const adForm = document.querySelector(".ad-form");
  const mainPin = document.querySelector(".map__pin--main");
  const address = document.querySelector("#address");
  const housingType = document.querySelector("#housing-type");
  const housingPrice = document.querySelector("#housing-price");
  const housingRooms = document.querySelector("#housing-rooms");
  const housingGuests = document.querySelector("#housing-guests");
  const features = document.querySelectorAll(".map__features input");
  const mapForm = document.querySelector(".map__filters");
  const disabledFormElements = document.querySelectorAll(".ad-form fieldset, .map__filters select, .map__filters fieldset");
  const mainPinX =
    parseInt(mainPin.style.left, 10) + Math.round(MAIN_PIN_WIDTH / 2);
  const mainPinY =
    parseInt(mainPin.style.top, 10) + Math.round(MAIN_PIN_HEIGHT);

  const insertPins = window.pin.insertPins;

  let hotels = [];

  mapForm.addEventListener("change", () => {
    window.util.deletePins();

    filterHotelType();
    // filterHotelPrice();
    // filterHotelGuests();
    // filterHotelRooms();
    // filterFeatures();
  });

  const filterHotelType = () => {
    let sameHotels;

    if (housingType.value === "any") {
      sameHotels = hotels;
    } else {
      sameHotels = hotels.filter(function (hotel) {
        return hotel.offer.type === housingType.value;
      });
    }

    insertPins(sameHotels);
  };

  const filterHotelPrice = () => {
    let housingPriceCurrentValue = housingPrice.value;
    let sameHotels;

    if (housingPriceCurrentValue === "any") {
      sameHotels = hotels;
    } else if (housingPriceCurrentValue === "middle") {
      sameHotels = hotels.filter(function (hotel) {
        return hotel.offer.price >= 10000 && hotel.offer.price <= 50000;
      });
    } else if (housingPriceCurrentValue === "low") {
      sameHotels = hotels.filter(function (hotel) {
        return hotel.offer.price < 10000;
      });
    } else if (housingPriceCurrentValue === "high") {
      sameHotels = hotels.filter(function (hotel) {
        return hotel.offer.price > 50000;
      });
    }

    insertPins(sameHotels);
  };

  const filterHotelRooms = () => {
    let sameHotels;

    if (housingRooms.value === "any") {
      sameHotels = hotels;
    } else {
      sameHotels = hotels.filter(function (hotel) {
        return hotel.offer.rooms === +housingRooms.value;
      });
    }

    insertPins(sameHotels);
  };

  const filterHotelGuests = () => {
    let sameHotels;

    if (housingGuests.value === "any") {
      sameHotels = hotels;
    } else {
      sameHotels = hotels.filter(function (hotel) {
        return hotel.offer.guests === +housingGuests.value;
      });
    }

    insertPins(sameHotels);
  };

  const filterFeatures = function () {
    let sameHotels;

    features.forEach(function (elements) {
      if (elements.checked) {
        sameHotels = hotels.filter(function (elem) {
          return elem.offer.features.indexOf(elements.value) >= 0;
        });
      }
    });

    insertPins(sameHotels);
  };

  const onSuccess = (data) => {
    hotels = data;
    activation();
  };

  const onError = (message) => console.error(message);

  window.load("https://21.javascript.pages.academy/keksobooking/data", onSuccess, onError);

  const removeAttributeDisabled = () => {
    for (let i = 0; i < disabledFormElements.length; i++) {
      disabledFormElements[i].removeAttribute("disabled");
    }
  };

  const addAttributeDisabled = () => {
    for (let i = 0; i < disabledFormElements.length; i++) {
      disabledFormElements[i].setAttribute("disabled", "");
    }
  };

  const showElements = () => {
    insertPins(hotels);
    removeAttributeDisabled();
    adForm.classList.remove("ad-form--disabled");
    map.classList.remove("map--faded");
    address.value = `${mainPinX}, ${mainPinY}`;
  };

  const activation = () => {
    mainPin.addEventListener("mousedown", function (evt) {
      if (map.classList.contains("map--faded") && evt.button === 0) {
        showElements();
      }
    });

    mainPin.addEventListener("keydown", function (evt) {
      if (map.classList.contains("map--faded") && evt.key === "Enter") {
        showElements();
      }
    });
  };

  window.main = {
    mainPinX,
    mainPinY,
    disabledFormElements,
    addAttributeDisabled,
  };
})();
