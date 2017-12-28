/**
    * @name ityped
    * @description Dead simple Animated Typing with no dependencies
    * @author Luis Vinícius
    * @email luisviniciusbarreto@gmail.com
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
      backSpeed = _ref$backSpeed === undefined ? 50 : _ref$backSpeed,
      _ref$backDelay = _ref.backDelay,
      backDelay = _ref$backDelay === undefined ? 500 : _ref$backDelay,
      _ref$startDelay = _ref.startDelay,
      startDelay = _ref$startDelay === undefined ? 500 : _ref$startDelay,
      _ref$cursorChar = _ref.cursorChar,
      cursorChar = _ref$cursorChar === undefined ? '|' : _ref$cursorChar,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? false : _ref$placeholder,
      _ref$showCursor = _ref.showCursor,
      showCursor = _ref$showCursor === undefined ? true : _ref$showCursor,
      _ref$disableBackTypin = _ref.disableBackTyping,
      disableBackTyping = _ref$disableBackTypin === undefined ? false : _ref$disableBackTypin,
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
    placeholder: placeholder,
    startDelay: startDelay,
    showCursor: showCursor,
    loop: loop,
    disableBackTyping: disableBackTyping,
    onFinished: onFinished
  };
};

var getElement = function getElement(element) {
  return typeof element === "string" ? document.querySelector(element) : element;
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
    window.setTimeout(function () {
      var k = 0;

      var _loop = function _loop(l) {
        k += 1;
        if (props.disableBackTyping && isLastLetterOfLastString(word, props) && !props.loop) {
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

  props.placeholder ? el.placeholder += word[i] : el.innerHTML += word[i];
};

var isLastLetterOfLastString = function isLastLetterOfLastString(word, props) {
  return props.strings.indexOf(word) === props.strings.length - 1;
};

var eraseString = function eraseString(i, el, props, word) {
  props.placeholder ? el.placeholder = el.placeholder.substring(0, --i) : el.innerHTML = el.innerHTML.substring(0, --i);

  if (i === 0 && isLastLetterOfLastString(word, props) && props.loop) {
    start(el, props);
  } else if (isLastLetterOfLastString(word, props) && !props.loop) {
    props.onFinished();
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

  var arrLen = strings.length;
  for (var i = 0; i < arrLen; i++) {
    var len = strings[i].length;
    var nextTime = len * typeSpeed + startDelay + len * backSpeed + backDelay;
    times.push(nextTime);
    var time = i === 0 ? startDelay : startDelay + times[i - 1];
    writeString(element, i, props, time);
  }
};

var init = function init(el, config) {
  var props = setProps(config || {}),
      element = getElement(el);
  insertCursor(element, getCursor(props), props);
  start(element, props);
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
