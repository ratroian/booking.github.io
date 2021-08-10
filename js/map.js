import {activateForm, activateMapFilters} from './form.js';
import {createPopup} from './popup.js';
import {MAX_QUANTITY_ADS} from './data.js';
import {getData, ADS} from './api.js';

const STARTING_COORDINATES = {
  lat: '35.68950',
  lng: '139.69171',
};
const MAP_ZOOM_LEVEL = 10;
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_ANCHOR = [26, 52];
const REGULAR_ADS_ICON_SIZE = [40, 40];
const REGULAR_ADS_ICON_ANCHOR = [20, 40];
const TITLE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TITLE_LAYER_ATTRIBUTION = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
};
const MAIN_PIN_ICON_URL = '../img/main-pin.svg';
const REGULAR_ADS_ICON_URL = '../img/pin.svg';

const adFormAdressInput = document.querySelector('#address');

const setCoordinatesValue = ({lat, lng}) => `${lat}, ${lng}`;

const getStartingCoordinats = () => adFormAdressInput.value = setCoordinatesValue(STARTING_COORDINATES);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_ICON_URL,
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_ANCHOR,
});

const mainPinMarker = L.marker(
  STARTING_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const regularAdsIcon = L.icon({
  iconUrl: REGULAR_ADS_ICON_URL,
  iconSize: REGULAR_ADS_ICON_SIZE,
  iconAnchor: REGULAR_ADS_ICON_ANCHOR,
});

const markersGroup = L.layerGroup();

const createMarker = (item) => {
  const marker = L.marker(
    item.location,
    {
      regularAdsIcon,
    },
  );

  marker
    .addTo(markersGroup)
    .bindPopup(
      createPopup(item),
      {
        keepInView: true,
      },
    );
};

const getMarkersGroup = (offers) => {
  markersGroup.clearLayers();

  if (offers.length) {
    offers.forEach((point) => {
      createMarker(point);
    });
  }
};

const getMap = () => {
  const map = L.map('map')
    .on('load', async () => {
      activateForm();
      getStartingCoordinats();

      const offers = await getData();

      getMarkersGroup(offers.slice(0, MAX_QUANTITY_ADS));
      activateMapFilters();
    })
    .setView(STARTING_COORDINATES, MAP_ZOOM_LEVEL);

  L.tileLayer(
    TITLE_LAYER,
    TITLE_LAYER_ATTRIBUTION,
  ).addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();

    coordinates.lat = coordinates.lat.toFixed(5);
    coordinates.lng = coordinates.lng.toFixed(5);

    adFormAdressInput.value = setCoordinatesValue(coordinates);
  });

  mainPinMarker.addTo(map);
  markersGroup.addTo(map);
};

const setMapByDefault = () => {
  mainPinMarker.setLatLng(STARTING_COORDINATES);
  adFormAdressInput.value = setCoordinatesValue(STARTING_COORDINATES);
  getMarkersGroup(ADS.slice(0, MAX_QUANTITY_ADS));
};

export {getMap, getStartingCoordinats, setMapByDefault, getMarkersGroup};
