import {resetForm} from './form.js';
import { getStartingCoordinats} from './map.js';
import {MESSAGE_ERROR} from './data.js';
import {showAlert} from './utils.js';

let ADS = [];

const getData = () =>
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) =>{
      if (response.ok) {
        return response;
      }
      throw new Error(showAlert(MESSAGE_ERROR));
    }).then((response) => response.json())
    .then((offers) => {
      ADS = [...offers];

      return offers;
    })
    .catch(() => []);

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body,
      },
    );

    if (response.ok) {
      resetForm();
      getStartingCoordinats();
      onSuccess();
    } else {
      onFail();
    }
  }
  catch (error) {
    onFail();
  }
};

export {getData, sendData, ADS};
