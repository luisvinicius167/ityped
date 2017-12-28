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

/**
 * @name setProps
 * @description Set the ityped properties configuration
 * @param {Object} config The configuration properties
 * @return {Promise}
 */
var setProps = function setProps(_ref) {
  var _ref$strings = _ref.strings,
      strings = _ref$strings === undefined ? ['Put your strings here...', 'and Enjoy!'] : _ref$strings,
      _ref$typeSpeed = _ref.typeSpeed,
      typeSpeed = _ref$typeSpeed === undefined ? 100 : _ref$typeSpeed,
      _ref$backSpeed = _ref.backSpeed,
      backSpeed = _ref$backSpeed === undefined ? 100 : _ref$backSpeed,
      _ref$backDelay = _ref.backDelay,
      backDelay = _ref$backDelay === undefined ? 1200 : _ref$backDelay,
      _ref$startDelay = _ref.startDelay,
      startDelay = _ref$startDelay === undefined ? 100 : _ref$startDelay,
      _ref$cursorChar = _ref.cursorChar,
      cursorChar = _ref$cursorChar === undefined ? '|' : _ref$cursorChar,
      _ref$showCursor = _ref.showCursor,
      showCursor = _ref$showCursor === undefined ? true : _ref$showCursor,
      _ref$stopLastWord = _ref.stopLastWord,
      stopLastWord = _ref$stopLastWord === undefined ? false : _ref$stopLastWord,
      _ref$onFinished = _ref.onFinished,
      onFinished = _ref$onFinished === undefined ? function () {} : _ref$onFinished,
      _ref$loop = _ref.loop,
      loop = _ref$loop === undefined ? true : _ref$loop;
  return {
    strings: strings,
    typeSpeed: typeSpeed,
    backSpeed: backSpeed,
    cursorChar: cursorChar,
    backDelay: backDelay,
    startDelay: startDelay,
    showCursor: showCursor,
    loop: loop,
    stopLastWord: stopLastWord,
    onFinished: onFinished
  };
};

var getElement = function getElement(el) {
  return document.querySelector(el);
};

var getCursor = function getCursor(props) {
  var cursorChar = props.cursorChar;

  var cursor = document.createElement('span');
  cursor.classList.add('ityped-cursor');
  cursor.textContent = cursorChar;
  return cursor;
};

var insertCursor = function insertCursor(element, cursor, props) {
  return props.showCursor ? element.insertAdjacentElement('afterend', cursor) : null;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var typeString = function typeString(word, i, el, props) {
  if (i === word.length - 1) {
    return window.setTimeout(function () {
      var k = 0;

      var _loop = function _loop(l) {
        k += 1;
        console.log(props.stopLastWord);
        if (props.stopLastWord && props.strings.indexOf(word) === props.strings.length - 1) {
          return {
            v: props.onFinished()
          };
        }
        setTimeout(function () {
          return eraseString(l, el, props, word);
        }, props.backSpeed * k);
      };

      for (var l = word.length - 1; l >= 0; l--) {
        var _ret = _loop(l);

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
      }
    }, props.backDelay);
  }
  el.innerHTML += word[i];
};

var eraseString = function eraseString(i, el, props, word) {
  el.innerHTML = el.innerHTML.substring(0, --i);
  if (i === 0 && props.strings.indexOf(word) === props.strings.length - 1 && props.loop) {
    props.onFinished ? props.onFinished() : null;
    start(el, props);
  }
};

var writeString = function writeString(el, position, props, time) {
  var word = props.strings[position];
  var startTick = window.setTimeout(function () {
    Array.from(word).forEach(function (letter, i) {
      return setTimeout(function () {
        return typeString(word, i, el, props);
      }, props.typeSpeed * (i + 1));
    });
  }, time);
};

var start = function start(element, props) {
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
    writeString(element, i, props, time);
  }
};

var init = function init(el, config) {
  var props = setProps(config),
      element = getElement(el);
  insertCursor(element, getCursor(props), props);
  start(element, props);
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
