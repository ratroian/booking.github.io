import {setUserFormSubmit} from './form.js';
import {getMap} from './map.js';
import {showMessageSuccess} from './user-popup.js';
import {startEventListener} from './filter.js';

getMap();
setUserFormSubmit(showMessageSuccess);
startEventListener();
