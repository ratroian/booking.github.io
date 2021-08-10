import {OFFER_TYPES} from './data.js';
import {createImage, createListItem} from './utils.js';

const getPhotosListFragment = (photos) => {
  const popupPhotosFragment = document.createDocumentFragment();

  if (!photos) {
    return popupPhotosFragment;
  }

  photos.forEach((photo) => {
    const photoElement = createImage(photo);
    popupPhotosFragment.appendChild(photoElement);
  });

  return popupPhotosFragment;
};

const getFeaturesListFragment = (features) => {
  const popupFeaturesFragment = document.createDocumentFragment();

  if (!features) {
    return popupFeaturesFragment;
  }

  features.forEach((feature) => {
    const featuresElement = createListItem(feature);
    popupFeaturesFragment.appendChild(featuresElement);
  });

  return popupFeaturesFragment;
};

const createPopup = (cardData) =>{

  const similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const cardElement = similarCardTemplate.cloneNode(true);
  const popupPhotos = cardElement.querySelector('.popup__photos');

  const popupFeatures = cardElement.querySelector('.popup__features');
  popupFeatures.innerHTML = '';

  cardElement.querySelector('.popup__title').textContent = cardData.offer.title || '';
  cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address || '';
  cardElement.querySelector('.popup__text--price').textContent = `${cardData.offer.price} ₽/ночь` || '';
  cardElement.querySelector('.popup__type').textContent = OFFER_TYPES[cardData.offer.type] || '';
  cardElement.querySelector('.popup__text--capacity').textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей` || '';
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}` || '';
  cardElement.querySelector('.popup__description').textContent = cardData.offer.description || '';

  if (cardData.offer.features) {
    popupFeatures.appendChild(getFeaturesListFragment(cardData.offer.features));
  } else {
    popupFeatures.remove();
  }
  if (cardData.offer.photos) {
    popupPhotos.appendChild(getPhotosListFragment(cardData.offer.photos));
  } else {
    popupPhotos.remove();
  }
  if (cardData.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = cardData.author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').remove();
  }

  return cardElement;
};

export {createPopup};
