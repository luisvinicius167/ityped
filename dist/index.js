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
      backSpeed = _ref$backSpeed === undefined ? 100 : _ref$backSpeed,
      _ref$backDelay = _ref.backDelay,
      backDelay = _ref$backDelay === undefined ? 100 : _ref$backDelay,
      _ref$startDelay = _ref.startDelay,
      startDelay = _ref$startDelay === undefined ? 100 : _ref$startDelay,
      _ref$showCursor = _ref.showCursor,
      showCursor = _ref$showCursor === undefined ? true : _ref$showCursor,
      _ref$loop = _ref.loop,
      loop = _ref$loop === undefined ? false : _ref$loop;
  return { strings: strings, typeSpeed: typeSpeed, backSpeed: backSpeed, backDelay: backDelay, startDelay: startDelay, showCursor: showCursor, loop: loop };
};

var insertCursor = function insertCursor(element, cursor) {
  return element.insertAdjacentElement('afterend', cursor);
};
var getElement = function getElement(el) {
  return document.querySelector(el);
};

var init = function init(el, config) {
  var props = setProps(config);
  insertCursor(getElement(el), getCursor());
  walkWithWords(el, props);
};

// const iterate = (s) => {
//   const w = 
// }

// Pega o array e itera na primeira posição
var walkWithWords = function walkWithWords(el, _ref2) {
  var strings = _ref2.strings,
      typeSpeed = _ref2.typeSpeed,
      backSpeed = _ref2.backSpeed,
      backDelay = _ref2.backDelay,
      startDelay = _ref2.startDelay,
      showCursor = _ref2.showCursor,
      loop = _ref2.loop;

  var element = getElement(el);
  var times = [];
  return Promise.all(strings.map(function (string, index) {
    return function (i) {
      var len = string.length - 1;
      var time = startDelay + len * typeSpeed + len * backSpeed;
      times.push(time);
      var t = window.setTimeout(function () {
        return incrementWord(i, time = index === 0 ? startDelay : time, decrementWord, element, { strings: strings, typeSpeed: typeSpeed, backSpeed: backSpeed, backDelay: backDelay, startDelay: startDelay, showCursor: showCursor, loop: loop });
      }, startDelay);
    }(index);
  }));
};

// const incrementWord = (
//   i,
//   time,
//   el,
//   { strings, typeSpeed, backSpeed, backDelay, startDelay, showCursor, loop }
// ) => {
//   return decrement => {
//     window.setTimeout(() => {
//       console.log('inc', time)
//       Array.prototype.forEach.call(strings[i], (letter, index, arr) => {
//         const t = window.setTimeout(() => {
//           el.innerHTML += letter
//           if (index === arr.length - 1) {
//             window.clearTimeout(t)
//             decrement(i, time, el, { strings, typeSpeed, backSpeed, backDelay, startDelay, showCursor, loop })
//           }
//         }, typeSpeed * index)
//       }) 
//     }, i === 0 ? startDelay : time + startDelay)
//   }
// }

var incrementWord = function incrementWord(i, time, decrement, el, _ref3) {
  var strings = _ref3.strings,
      typeSpeed = _ref3.typeSpeed,
      backSpeed = _ref3.backSpeed,
      backDelay = _ref3.backDelay,
      startDelay = _ref3.startDelay,
      showCursor = _ref3.showCursor,
      loop = _ref3.loop;

  return new Promise(function (resolve, reject) {
    window.setTimeout(function () {
      Array.prototype.forEach.call(strings[i], function (letter, index, arr) {
        var t = window.setTimeout(function () {
          el.innerHTML += letter;
          if (index === arr.length - 1) {
            window.clearTimeout(t);
            decrement(i, time, el, { strings: strings, typeSpeed: typeSpeed, backSpeed: backSpeed, backDelay: backDelay, startDelay: startDelay, showCursor: showCursor, loop: loop }, resolve);
          }
        }, typeSpeed * index);
      });
    }, time);
  });
};

var decrementWord = function decrementWord(i, time, el, _ref4, resolve) {
  var strings = _ref4.strings,
      typeSpeed = _ref4.typeSpeed,
      backSpeed = _ref4.backSpeed,
      backDelay = _ref4.backDelay,
      startDelay = _ref4.startDelay,
      showCursor = _ref4.showCursor,
      loop = _ref4.loop;

  window.setTimeout(function () {
    Array.prototype.forEach.call(strings[i], function (letter, index, arr) {
      var position = el.innerHTML.length - index;
      var tick = window.setTimeout(function () {
        index === arr.length - 1 ? el.innerHTML = el.innerHTML.substring(0, position - 1) : el.innerHTML = el.innerHTML.substring(0, position);
        if (index === arr.length - 1) {
          window.clearTimeout(tick);
          resolve();
        }
      }, backSpeed * index);
    });
  }, time);
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
