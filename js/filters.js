"use strict";

(function () {

  const MAX_LOW_PRICE = 9999;
  const MIN_MIDDLE_PRICE = 10000;
  const MAX_MIDDLE_PRICE = 50000;
  const MIN_HIGH_PRICE = 50001;

  const filter = document.querySelector(`.map__filters`);
  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const featuresFieldset = filter.querySelector(`#housing-features`);

  let data = [];
  let filterData = [];

  const housingPriceRange = {
    low: {
      MIN: 0,
      MAX: MAX_LOW_PRICE
    },
    middle: {
      MIN: MIN_MIDDLE_PRICE,
      MAX: MAX_MIDDLE_PRICE
    },
    high: {
      MIN: MIN_HIGH_PRICE,
      MAX: Infinity
    }
  };

  const filterHotelType = () => {
    if (housingPrice.value === `any`) {
      return;
    }
    filterData = filterData.filter((hotel) => hotel.offer.type === housingType.value);
  };

  const filterHotelPrice = () => {
    let priceValue = housingPriceRange[housingPrice.value];
    if (housingPrice.value === `any`) {
      return;
    }
    filterData = filterData.filter((hotel) => priceValue ? hotel.offer.price >= priceValue.MIN && hotel.offer.price <= priceValue.MAX : true);
  };

  const filterHotelRooms = function () {
    if (housingRooms.value === `any`) {
      return;
    }
    filterData = filterData.filter((hotel) => hotel.offer.rooms === +housingRooms.value);
  };

  const filterHotelGuests = function () {
    if (housingGuests.value === `any`) {
      return;
    }
    filterData = filterData.filter((hotel) => hotel.offer.guests === +housingGuests.value);
  };

  const filterHotelFeatures = function () {
    let checkedFeatures = featuresFieldset.querySelectorAll(`input:checked`);
    filterData = filterData.filter((hotel) => Array.from(checkedFeatures).every((element) => hotel.offer.features.includes(element.value)));
  };

  const filtersChange = () => {
    filterData = data.slice();

    filterHotelType();
    filterHotelPrice();
    filterHotelRooms();
    filterHotelGuests();
    filterHotelFeatures();

    const popup = document.querySelector(`.popup`);
    if (popup) {
      popup.remove();
    }
    window.util.deletePins();
    window.pin.insertPins(filterData);
  };

  const activateFilters = function (adData) {
    data = adData.slice();
    filter.addEventListener(`change`, filtersChange);
    return adData;
  };

  window.filters = {
    activateFilters
  };
})();
