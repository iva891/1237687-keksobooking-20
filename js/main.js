'use strict';

var TITLES = ['Заголовок-1', 'Заголовок-2', 'Заголовок-3', 'Заголовок-4', 'Заголовок-5'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = [12, 13, 14];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Описание-1', 'Описание-2', 'Описание-3', 'Описание-4', 'Описание-5'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var USERS = 8;
var MIN_X = 0;
var MIN_Y = 130;
var MAX_Y = 630;
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;

var map = document.querySelector('.map');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var getArrayRandomLength = function (array) {
  var resultArray = array;
  var resultArrayString = resultArray[0];
  resultArray.length = getRandom(1, array.length);
  for (var i = 1; i < resultArray.length; i++) {
    resultArrayString = resultArrayString + ', ' + resultArray[i];
  }
  return resultArrayString;
};

var objects = [];

var createObject = function (i) {

  var object = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png',
    },
    offer: {
      title: TITLES[i],
      address: getRandom(0, 980) + ',' + getRandom(0, 980),
      price: getRandom(100, 1200),
      type: getRandomArrayItem(TYPES),
      rooms: getRandom(1, 5),
      guests: getRandom(1, 10),
      checkin: getRandomArrayItem(TIMES) + ':00',
      checkout: getRandomArrayItem(TIMES) + ':00',
      features: getArrayRandomLength(FEATURES),
      description: DESCRIPTIONS[i],
      photos: getArrayRandomLength(PHOTOS),
    },
    location: {
      x: getRandom(MIN_X, map.offsetWidth),
      y: getRandom(MIN_Y, MAX_Y),
    }
  };

  return object;
};

var createObjects = function (element) {
  for (var i = 1; i < USERS + 1; i++) {
    objects.push(element(i));
  }
};

createObjects(createObject);


var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  var locationX = pin.location.x - WIDTH_PIN + 'px';
  var locationY = pin.location.y - HEIGHT_PIN + 'px';

  pinElement.style.left = locationX;
  pinElement.style.top = locationY;
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();

var insertPin = function (array) {
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }
  pinsList.appendChild(fragment);
};

insertPin(objects);

// module4-task2

var RADIUS_MAIN_PIN = 65;
var MAX_ROOM = '100';
var NOT_FOR_GUEST = '0';

var formFieldsets = document.querySelectorAll('.ad-form fieldset');
var pinMain = document.querySelector('.map__pin--main');
var address = document.querySelector('#address');
var pinMainX = parseInt(pinMain.style.left, 10);
var pinMainY = parseInt(pinMain.style.top, 10);
var formMain = document.querySelector('.ad-form');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var setDisable = function (elem) {
  elem.setAttribute('disabled', 'disabled');
};

var removeDisable = function (elem) {
  elem.removeAttribute('disabled');
};

formFieldsets.forEach(setDisable);

var getActiveForm = function () {
  map.classList.remove('map--faded');
  address.setAttribute('value', Math.round(pinMainX + WIDTH_PIN / 2) + ', ' + Math.round(pinMainY + HEIGHT_PIN));
  formFieldsets.forEach(removeDisable);
};

address.setAttribute('value', pinMainX + Math.round(RADIUS_MAIN_PIN / 2) + ', ' + Math.round(pinMainY + RADIUS_MAIN_PIN / 2));

var handleMouseClick = function (event) {
  if (event.button === 0) {
    getActiveForm();
  }
};

var handleEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    getActiveForm();
  }
};

pinMain.addEventListener('mousedown', handleMouseClick);

pinMain.addEventListener('keydown', handleEnterPress);

var validateForm = function () {
  capacity.setCustomValidity('');

  if ((roomNumber.value === MAX_ROOM) && (capacity.value !== NOT_FOR_GUEST)) {
    capacity.setCustomValidity('100 комнат не для гостей');
  } else if (roomNumber.value < capacity.value) {
    capacity.setCustomValidity('Количество мест не должно превышать количество комнат');
  } else if (roomNumber.value !== MAX_ROOM && capacity.value === NOT_FOR_GUEST) {
    capacity.setCustomValidity('Укажите количество гостей');
  }
};

formMain.addEventListener('input', validateForm);


