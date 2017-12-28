/**
    * @name ityped
    * @description Dead simple Animated Typing with no dependencies
    * @author Luis Vinícius
    * @email luis@uilabs.me
    */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.ityped = {})));
}(this, (function (exports) { 'use strict';

var getCursor = function getCursor() {
  var cursor = document.createElement('span');
  cursor.classList.add('ityped-cursor');
  cursor.textContent = '|';
  return cursor;
};

var insertCursor = function insertCursor(element, cursor) {
  return element.insertAdjacentElement('afterend', cursor);
};
var getElement = function getElement(el) {
  return document.querySelector(el);
};

/**
 * @name setProps
 * @description Set the ityped properties configuration
 * @param {Object} config The configuration properties
 * @return {Promise}
 */
var setProps = function setProps(_ref) {
  var _ref$strings = _ref.strings,
      strings = _ref$strings === undefined ? ['AEIOU asiahsa skaonsa', 'SZsiasa'] : _ref$strings,
      _ref$typeSpeed = _ref.typeSpeed,
      typeSpeed = _ref$typeSpeed === undefined ? 100 : _ref$typeSpeed,
      _ref$backSpeed = _ref.backSpeed,
      backSpeed = _ref$backSpeed === undefined ? 300 : _ref$backSpeed,
      _ref$backDelay = _ref.backDelay,
      backDelay = _ref$backDelay === undefined ? 100 : _ref$backDelay,
      _ref$startDelay = _ref.startDelay,
      startDelay = _ref$startDelay === undefined ? 100 : _ref$startDelay,
      _ref$showCursor = _ref.showCursor,
      showCursor = _ref$showCursor === undefined ? true : _ref$showCursor,
      _ref$loop = _ref.loop,
      loop = _ref$loop === undefined ? true : _ref$loop;
  return {
    strings: strings,
    typeSpeed: typeSpeed,
    backSpeed: backSpeed,
    backDelay: backDelay,
    startDelay: startDelay,
    showCursor: showCursor,
    loop: loop
  };
};

var startLoop = function startLoop(element, props) {
  var times = [];
  var strings = props.strings,
      startDelay = props.startDelay,
      typeSpeed = props.typeSpeed,
      backSpeed = props.backSpeed,
      backDelay = props.backDelay,
      loop = props.loop;

  var len = strings.length;
  for (var i = 0; i < strings.length; i++) {
    var _len = strings[i].length;
    var nextTime = _len * typeSpeed + startDelay + _len * backSpeed + backDelay;
    times.push(nextTime);
    var time = i === 0 ? startDelay : times[i - 1];
    startWriting(element, i, props, time);
  }
};
var init = function init(el, config) {
  var props = setProps(config);
  var element = getElement(el);
  insertCursor(element, getCursor());
  startLoop(element, props);
};

var startWriting = function startWriting(el, position, props, time) {
  var word = props.strings[position];
  var startTick = window.setTimeout(function () {
    Array.from(word).forEach(function (letter, i) {
      return setTimeout(function () {
        return typeString(word, i, el, props);
      }, props.typeSpeed * (i + 1));
    });
  }, time);
};

var typeString = function typeString(word, i, el, props) {
  if (i === word.length - 1) {
    return window.setTimeout(function () {
      var k = 0;
      var tick = void 0;

      var _loop = function _loop(l) {
        k += 1;
        tick = setTimeout(function () {
          return eraseString(l, el, props, word);
        }, props.backSpeed * k);
      };

      for (var l = word.length - 1; l >= 0; l--) {
        _loop(l);
      }
      clearTimeout(tick);
    }, props.backDelay);
  }
  el.innerHTML += word[i];
};

var eraseString = function eraseString(i, el, props, word) {
  el.innerHTML = el.innerHTML.substring(0, --i);
  if (i === 0 && props.strings.indexOf(word) === props.strings.length - 1 && props.loop) {
    startLoop(el, props);
  }
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
