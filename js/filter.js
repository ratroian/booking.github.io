import {getMarkersGroup} from './map.js';
import {ADS} from './api.js';
import {debounce} from './utils.js';
import {MAX_QUANTITY_ADS, DEBOUNCE_TIMEOUT_DELAY, PRICE_VALUES} from './data.js';

const filtersContainer = document.querySelector('.map__filters-container');
const filters = filtersContainer.querySelectorAll('.map__filter');

let filteredAds = [];

const filterByType = (ads, filterValue) => ads.filter((ad) => ad.offer.type === filterValue);
const filterByRooms = (ads, filterValue) => ads.filter((ad) => ad.offer.rooms.toString() === filterValue);
const filterByGuests = (ads, filterValue) => ads.filter((ad) => ad.offer.guests.toString() === filterValue);
const filterByPrice = (ads, filterValue) => ads.filter((ad) => {
  const priceInterval = {
    'low': ad.offer.price < PRICE_VALUES.MIDDLE_START,
    'middle': ad.offer.price >= PRICE_VALUES.MIDDLE_START && ad.offer.price <= PRICE_VALUES.MIDDLE_FINAL,
    'high': ad.offer.price > PRICE_VALUES.MIDDLE_FINAL,
  };

  return priceInterval[filterValue];
});

const filterByFeatures = (ads, featureValue) => ads.filter((ad) => ad.offer.features && ad.offer.features.indexOf(featureValue) >= 0);

const filterNameToFilter = {
  'housing-type': filterByType,
  'housing-rooms': filterByRooms,
  'housing-guests': filterByGuests,
  'housing-price': filterByPrice,
};

const filterAds = (ads) => {
  filteredAds = ads.slice();

  const appliedFilters = Array.from(filters).filter((filterItem) => filterItem.value !== 'any');
  const checkedFeatures = Array.from(filtersContainer.querySelectorAll('.map__features input[name="features"]:checked'));

  appliedFilters.forEach((filterItem) => {
    filteredAds = filterNameToFilter[filterItem.name](filteredAds, filterItem.value);
  });

  checkedFeatures.forEach((feature) => {
    filteredAds = filterByFeatures(filteredAds, feature.value);
  });

  return filteredAds.slice(0, MAX_QUANTITY_ADS);
};

const startEventListener = () => {
  filtersContainer.addEventListener('click', (event) => {
    const targetElement = event.target;

    if (targetElement.htmlFor) {
      return;
    }

    const withDebounce = debounce(() => getMarkersGroup(filterAds(ADS)), DEBOUNCE_TIMEOUT_DELAY);
    withDebounce();
  });
};

export {filterAds, startEventListener};
