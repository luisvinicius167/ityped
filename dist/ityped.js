var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @name ityped
 * @description Dead simple Animated Typing with no dependencies
 * @author Luis Vinícius
 * @email luis@uilabs.me
 */;
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
    module.exports = {
      init: factory.init
    };
  } else {
    root.ityped = factory;
  }
})(this, function (global) {
  /**
   * async foreach
   * https://www.npmjs.com/package/async-foreach
   */
  (function (a) {
    a.forEach = function (a, b, c) {
      var d = -1,
          e = a.length >>> 0;
      (function f(g) {
        var h,
            j = g === !1;
        do {
          ++d;
        } while (!(d in a) && d !== e);
        if (j || d === e) {
          c && c(!j, a);
          return;
        }
        g = b.call({
          async: function async() {
            return h = !0, f;
          }
        }, a[d], d, a), h || f(g);
      })();
    };
  })((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && exports || global);

  /**
   * el is the element
   */
  var el = void 0,
      props = void 0,

  /**
  * creating the cursor
  */
  cursor = document.createElement('span');
  cursor.classList.add('ityped-cursor');
  cursor.textContent = '|';

  /**
   * @name init
   * @param {String} el The element that will receive the strings
   * @param {Object} confing The initial configuration
   */
  function init(element, config) {
    el = document.querySelector(element);
    props = config;
    props.strings = config.strings || ['Put you string here...', 'and Enjoy!'];
    props.typeSpeed = config.typeSpeed || 70;
    props.pause = config.pause || 500;
    props.loop = config.loop || false;
    el.insertAdjacentElement('afterend', cursor);
    var words = props.strings,
        len = words.length;

    loopingOnWords(words);
  }

  /**
   * @name loopingOnWords
   * @description Loop on each string passed
   * @param {Array} words The array that contain the words
   */
  function loopingOnWords(words) {
    forEach(words, function (word, index, arr) {
      var time = props.typeSpeed * word.length - 1;
      var done = this.async();
      var len = words.length;
      iterateWords(el, word, index, len).then(function () {
        setTimeout(function () {
          done();
        }, time);
      });
    }, function () {
      if (props.loop) {
        loopingOnWords(words);
      }
    });
  }
  /**
   * @name increment
   * @description Increment each letter and append it on element
   * @param {Element} span The Element that will receive the letters
   * @param {String} word The string that will be looped to
   * get each letter
   * @return {Promise}
   */
  function increment(span, word) {
    return new Promise(function (resolve, reject) {
      var _loop = function _loop(i) {
        count = 0;
        var wordIndex = i;
        var len = word.length;
        setTimeout(function (i) {
          appendWord(span, word.charAt(wordIndex));
          count++;
          if (count === len - 1) {
            resolve();
          }
        }, props.typeSpeed * i);
      };

      for (var i = 0; i < word.length; i++) {
        _loop(i);
      }
    });
  }
  /**
   * @name appendWord
   * @description Append each letter on Element
   * @param {Element} el The Element that will receive the letter
   * @param {String} word The string that will be appended
   */
  function appendWord(el, word) {
    el.innerHTML += word;
  }

  /**
   * @name iterateWords
   * @description Iterate on each word, incrementing and decrementing
   * @param {Element} element The Element that will receive the letters of word
   * @param {String} word The string that is the word
   * @param {Integer} index The index position of the words Array
   * @param {Integer} wordsLengthArray The length of words Array
   * @return {Promise}
   */
  function iterateWords(element, word, index, wordsLengthArray) {
    return new Promise(function (resolve, reject) {
      increment(element, word).then(function () {
        setTimeout(function () {
          decrement(element, word, index, wordsLengthArray).then(function () {
            resolve();
          });
        }, props.pause);
      });
    });
  }
  /**
   * @name interateInsideDecrement
   * @description Iterate on each word, inside the decrement function for decrement the word
   * @param {Element} span The Element that will receive the letters of word
   * @param {String} word The string that is the word
   * @param {Integer} len The length of words Array
   * @param {Promise} resolve The Promise.resolve method that will be trigerred when
   * the decrement iteration are finished
   * @return {Promise}
   */
  function interateInsideDecrement(span, word, len, resolve) {
    var _loop2 = function _loop2() {
      var iteratedI = i;
      var count = len;
      setTimeout(function (i) {
        span.innerHTML = word.substring(0, len - iteratedI);
        count--;
        if (iteratedI === 1) {
          resolve();
        }
      }, props.typeSpeed / 3 * i);
    };

    for (var i = len; i > 0; i--) {
      _loop2();
    }
  }

  /**
   * @name decrement
   * @description decrement the word in the correct case
   * @param {Element} span The Element that will receive the letters of word
   * @param {String} word The string that is the word
   * @param {Integer} index The index of the Array that contain the word
   * @param {Integer} lengthWords The length of words Array
   */
  function decrement(span, word, index, lengthWords) {
    return new Promise(function (resolve, reject) {
      var len = word.length;
      if (!props.loop && index + 1 === lengthWords) {
        span.innerHTML = word;
      } else if (props.loop) {
        interateInsideDecrement(span, word, len, resolve);
      } else if (index + 1 !== lengthWords) {
        interateInsideDecrement(span, word, len, resolve);
      }
    });
  }

  /**
   * Return the init function
   */
  return { init: init };
}(this));
//# sourceMappingURL=ityped.js.map
