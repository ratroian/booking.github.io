const OFFER_TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};
const PRICE_VALUES = {
  MIDDLE_START: 10000,
  MIDDLE_FINAL: 50000,
};
const DISABLED_FORM_CLASSNAME = 'ad-form--disabled';
const MAX_PRICE_VALUE = 1000000;
const MIN_LABEL_LENGTH = 30;
const MAX_LABEL_LENGTH = 150;
const OFFER_TYPES_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000,
};

const MAX_QUANTITY_ADS = 10;
const DEBOUNCE_TIMEOUT_DELAY = 500;
const ALERT_SHOW_TIME = 5000;
const STYLE_ERROR_FIELD = '2px solid red';
const MESSAGE_ERROR = 'При загрузке данных с сервера произошла ошибка запроса!';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];

export {OFFER_TYPES, MAX_QUANTITY_ADS, DEBOUNCE_TIMEOUT_DELAY, PRICE_VALUES, DISABLED_FORM_CLASSNAME, MAX_PRICE_VALUE,
  MIN_LABEL_LENGTH, MAX_LABEL_LENGTH, OFFER_TYPES_PRICE, ALERT_SHOW_TIME, STYLE_ERROR_FIELD,
  MESSAGE_ERROR, FILE_TYPES};
