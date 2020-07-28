'use strict';

(function () {
  var TYPE = 'json';
  var SUCCESS_CODE = 200;
  var MAX_TIMEOUT = 10000;

  var xhr = new XMLHttpRequest();

  var textString;

  // var getText = function (partOfTextOne, partOfTextTwo = '', partOfTextThree = '', partOfTextFour = '') {
  //   textString = partOfTextOne + partOfTextTwo + partOfTextThree + partOfTextFour;
  // };

  var getText = function (text) {
    textString = text;
  };


  var onXhrLoad = function () {
    if (xhr.status === SUCCESS_CODE) {
      window.pin.insertPin(xhr.response);
    } else {
      getText('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      window.error(textString);
    }
  };

  var onXhrError = function () {
    getText('Произошла ошибка соединения');
    window.error(textString);
  };

  var onXhrTimeout = function () {
    getText('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    window.error(textString);
  };

  window.load = function (url) {

    xhr.responseType = TYPE;

    xhr.addEventListener('load', onXhrLoad);

    xhr.addEventListener('error', onXhrError);

    xhr.addEventListener('timeout', onXhrTimeout);

    xhr.timeout = MAX_TIMEOUT;

    xhr.open('GET', url);
    xhr.send();
  };
})();
