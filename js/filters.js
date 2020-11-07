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

  const filterElement = function (element, key, item) {
    return element.value === `any` ? true : element.value === item[key].toString();
  };

  const filterHotelType = (item) => {
    return filterElement(housingType, `type`, item.offer);
  };

  const filterHotelPrice = function (item) {
    let priceValue = housingPriceRange[housingPrice.value];
    return priceValue ? item.offer.price >= priceValue.MIN && item.offer.price <= priceValue.MAX : true;
  };

  const filterHotelRooms = function (item) {
    return filterElement(housingRooms, `rooms`, item.offer);
  };

  const filterHotelGuests = function (item) {
    return filterElement(housingGuests, `guests`, item.offer);
  };

  const filterHotelFeatures = function (item) {
    let checkedFeatures = featuresFieldset.querySelectorAll(`input:checked`);

    return Array.from(checkedFeatures).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  const filtersChange = () => {
    filterData = data.slice();
    filterData = filterData.filter(filterHotelType).filter(filterHotelPrice).filter(filterHotelRooms).filter(filterHotelGuests).filter(filterHotelFeatures);
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
