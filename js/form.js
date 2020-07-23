'use strict';

(function () {
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
    window.data.map.classList.remove('map--faded');
    address.setAttribute('value', Math.round(pinMainX + window.data.WIDTH_PIN / 2) + ', ' + Math.round(pinMainY + window.data.HEIGHT_PIN));
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
})();
