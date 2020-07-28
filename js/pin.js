'use strict';

(function () {
  var pinsList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    var locationX = pin.location.x - window.data.WIDTH_PIN + 'px';
    var locationY = pin.location.y - window.data.HEIGHT_PIN + 'px';

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

  window.pin = {
    insertPin: insertPin
  };

  window.load('https://javascript.pages.academy/keksobooking/data');

})();
