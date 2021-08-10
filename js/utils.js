import {ALERT_SHOW_TIME} from './data.js';

const getRandomPositiveFloat =(first, second, digits = 1) => {
  const lower = Math.min(Math.abs(first), Math.abs(second));
  const upper = Math.max(Math.abs(first), Math.abs(second));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

const getRandomPositiveInteger =(first, second) => {
  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createImage = (source) => {
  const imageElement = document.createElement('img');

  imageElement.classList.add('popup__photo');
  imageElement.width='45';
  imageElement.height='40';
  imageElement.alt='Фотография жилья';
  imageElement.src = source;

  return imageElement;
};

const createListItem = (featureName) => {
  const listElement = document.createElement('li');

  listElement.className = `popup__feature popup__feature--${featureName}`;

  return listElement;
};

const removeClassName = (element, className) => {
  element.classList.remove(className);
};

const removeAttributeDisabled = (elements) => {
  elements.forEach((element) => element.removeAttribute('disabled', 'disabled'));
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomPositiveFloat, getRandomPositiveInteger, createImage, createListItem,
  removeClassName, removeAttributeDisabled, isEscEvent, debounce, throttle,
  showAlert};
