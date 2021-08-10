import {removeClassName, removeAttributeDisabled} from './utils.js';
import {getStartingCoordinats, setMapByDefault} from './map.js';
import {sendData} from './api.js';
import {showMessageError} from './user-popup.js';
import {DISABLED_FORM_CLASSNAME, MAX_PRICE_VALUE,
  MIN_LABEL_LENGTH, MAX_LABEL_LENGTH, OFFER_TYPES_PRICE, STYLE_ERROR_FIELD} from './data.js';
import {startListenerPreview} from './preview-photo.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFeatures = document.querySelector('.map__features');
const mapFeaturesElements = mapFilters.querySelectorAll('#housing-features');
const formRoomNumberInput = document.querySelector('#room_number');
const formCapacityInput = document.querySelector('#capacity');
const adFormLabelInput = adForm.querySelector('#title');
const adFormPriceInput = adForm.querySelector('#price');
const adFormTypeList = adForm.querySelector('#type');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');
const adFormElementTime = adForm.querySelector('.ad-form__element--time');
const adFormResetButton = adForm.querySelector('.ad-form__reset');

const activateForm = () => {
  removeClassName(adForm, DISABLED_FORM_CLASSNAME);

  removeAttributeDisabled(adFormElements);

  startListenerPreview();
};

const activateMapFilters = () => {
  removeClassName(mapFilters, DISABLED_FORM_CLASSNAME);
  removeClassName(mapFeatures, DISABLED_FORM_CLASSNAME);

  removeAttributeDisabled(mapFiltersElements);
  removeAttributeDisabled(mapFeaturesElements);
};

const formCapacityVariants = Array.from(formCapacityInput);
const formRoomsNumberVariants = Array.from(formRoomNumberInput);

formCapacityInput.addEventListener('change', (evt) => {
  formRoomNumberInput.value = evt.target.value;
});

formRoomNumberInput.addEventListener('change', (evt) => {
  formCapacityInput.value = evt.target.value;
  formRoomNumberInput.reportValidity();

  formCapacityVariants.forEach((option) => {
    option.setAttribute('disabled' ,'disabled');
  });

  switch (formRoomNumberInput.value) {
    case '1':
      formRoomsNumberVariants[0].removeAttribute('disabled', 'disabled');
      break;
    case '2':
      formCapacityVariants[0].removeAttribute('disabled', 'disabled');
      formCapacityVariants[1].removeAttribute('disabled', 'disabled');
      break;
    case '3':
      formCapacityVariants[0].removeAttribute('disabled', 'disabled');
      formCapacityVariants[1].removeAttribute('disabled', 'disabled');
      formCapacityVariants[2].removeAttribute('disabled', 'disabled');
      break;
    case '100':
      formCapacityInput.value = '0';
      formCapacityVariants[3].removeAttribute('disabled', 'disabled');
  }
});

adFormLabelInput.addEventListener('input', () => {
  const valueLength = adFormLabelInput.value.length;

  if (valueLength < MIN_LABEL_LENGTH) {
    adFormLabelInput.setCustomValidity(`Ещё ${MIN_LABEL_LENGTH - valueLength} симв.`);

  } else if (valueLength > MAX_LABEL_LENGTH) {
    adFormLabelInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_LABEL_LENGTH} симв.`);
  } else {
    adFormLabelInput.setCustomValidity('');
  }

  if (!adFormLabelInput.validity.valid) {
    adFormLabelInput.style.outline = STYLE_ERROR_FIELD;
  } else {adFormLabelInput.style.outline= '';
  }
  adFormLabelInput.reportValidity();
});

const resetForm = () => {
  adForm.reset();
  mapFilters.reset();
  setMapByDefault();
};

adFormPriceInput.addEventListener('input', () => {
  if (adFormPriceInput.value > MAX_PRICE_VALUE) {
    adFormPriceInput.setCustomValidity(`Максимальная цена  ${MAX_PRICE_VALUE} руб.`);
  } else if (adFormPriceInput.value < OFFER_TYPES_PRICE[adFormTypeList.value]) {
    adFormPriceInput.setCustomValidity(`Минимальная цена  ${OFFER_TYPES_PRICE[adFormTypeList.value]} руб.`);
  } else {
    adFormPriceInput.setCustomValidity('');
  }
  if (!adFormPriceInput.validity.valid) {
    adFormPriceInput.style.outline = STYLE_ERROR_FIELD;
  } else {adFormPriceInput.style.outline= '';
  }
  adFormPriceInput.reportValidity();
});

adFormTypeList.addEventListener('change', (evt) => {
  const minPriceValue = OFFER_TYPES_PRICE[evt.target.value];
  adFormPriceInput.value = OFFER_TYPES_PRICE[evt.target.value];

  adFormPriceInput.setAttribute('min', minPriceValue);

  adFormPriceInput.value = Math.max(minPriceValue, adFormPriceInput.value);

  if (adFormPriceInput.value < minPriceValue) {
    adFormTypeList.setCustomValidity(`Минимальная цена за ночь ${OFFER_TYPES_PRICE[evt.target.value]} руб.`);
  } else {
    adFormPriceInput.setCustomValidity('');
  }

  adFormTypeList.reportValidity();
});

adFormElementTime.addEventListener('change', (evt) => {
  adFormTimeIn.value = evt.target.value;
  adFormTimeOut.value = evt.target.value;
});

adForm.addEventListener('invalid', (evt) => {
  evt.target.style.outline = STYLE_ERROR_FIELD;
}, true);

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      onSuccess,
      showMessageError,
      new FormData(evt.target),
    );
  });
};

adFormResetButton.addEventListener('click', (evt) =>{
  evt.preventDefault();

  resetForm();
  getStartingCoordinats();
});

export {activateForm, setUserFormSubmit, resetForm, activateMapFilters};
