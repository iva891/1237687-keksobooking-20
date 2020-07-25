'use strict';

(function () {
  var TYPE = 'json';
  var SUCCESS_CODE = 200;
  var MAX_TIMEOUT = 10000;

  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = TYPE;

    var onXhrLoad = function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    var onXhrError = function () {
      onError('Произошла ошибка соединения');
    };

    var onXhrTimeout = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.addEventListener('load', onXhrLoad);

    xhr.addEventListener('error', onXhrError);

    xhr.addEventListener('timeout', onXhrTimeout);

    xhr.timeout = MAX_TIMEOUT;

    xhr.open('GET', url);
    xhr.send();
  };
})();
