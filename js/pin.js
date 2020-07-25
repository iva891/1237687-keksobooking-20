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

  var onError = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 250px; margin: 30% auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = '50%';
    node.style.right = '50%';
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
    node.addEventListener('click', node.remove);
  };

  window.load('https://javascript.pages.academy/keksobooking/data', insertPin, onError);

})();
