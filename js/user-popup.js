import {isEscEvent} from './utils.js';

const body = document.querySelector('body');
let messageTemplate;
let messageElement;

const messageDeleteHandler = () => {
  messageElement.remove();
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    messageDeleteHandler();
    body.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const showMessageSuccess = () => {
  messageTemplate = document.querySelector('#success').content.querySelector('.success');
  messageElement = messageTemplate.cloneNode(true);

  body.appendChild(messageElement);

  body.addEventListener('click', messageDeleteHandler, {once: true});

  body.addEventListener('keydown', onPopupEscKeydown);
};

const showMessageError = () => {
  messageTemplate = document.querySelector('#error').content.querySelector('.error');
  const closeErrorButton = messageTemplate.querySelector('.error__button');
  messageElement = messageTemplate.cloneNode(true);

  body.appendChild(messageElement);

  body.addEventListener('click', messageDeleteHandler, {once: true});
  body.addEventListener('keydown', onPopupEscKeydown);
  closeErrorButton.addEventListener('click', messageDeleteHandler, {once: true});
};

export {showMessageSuccess, showMessageError};
