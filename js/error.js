'use strict';

(function () {
  window.error = function (message) {
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
})();
