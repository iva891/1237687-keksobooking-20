'use strict';

var TITLES = ['Заголовок-1', 'Заголовок-2', 'Заголовок-3', 'Заголовок-4', 'Заголовок-5'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = [12, 13, 14];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Описание-1', 'Описание-2', 'Описание-3', 'Описание-4', 'Описание-5'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var USERS = 8;
var MAX_X = document.querySelector('.map').offsetWidth;
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
      x: getRandom(MIN_X, MAX_X),
      y: getRandom(MIN_Y, MAX_Y),
    }
  };

  objects.push(object);
};

for (var i = 1; i < USERS + 1; i++) {
  createObject(i);
}

map.classList.remove('map--faded');

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
  for (i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }
  pinsList.appendChild(fragment);
};

insertPin(objects);
