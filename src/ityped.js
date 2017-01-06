/**
 * @name ityped
 * @description Dead simple Animated Type with no dependencies
 * @author Luis Vinícius
 */;
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = {
      init: factory.init
    }
  } else {
    root.ityped = factory;
  }
}(this, function (global) {
  (function (a) {
    a.forEach = function (a, b, c) {
      var d = -1,
        e = a.length >>> 0;
      (function f(g) {
        var h,
          j = g === !1;
        do 
          ++d;
        while (!(d in a) && d !== e);
        if (j || d === e) {
          c && c(!j, a);
          return
        }
        g = b.call({
          async: function () {
            return h = !0,
            f
          }
        }, a[d], d, a),
        h || f(g)
      })()
    }
  })(typeof exports == "object" && exports || global);

  /**
   * el is the element
   */
  let el,
    props,
    cursor = document.createElement('span');

  /**
   * creating the cursor
   */
  cursor
    .classList
    .add('ityped-cursor');
  cursor.textContent = '|';

  function loopingOnWords(words, handler) {
    forEach(words, function (word, index, arr) {
      // let time = props.typeSpeed * word.length - 1;
      var done = this.async();
      let len = words.length;
      iterateWords(el, word, index, len).then(function () {
        setTimeout(function () {
          done();
        }, 1000)
      })
    }, function () {
      if (props.loop) {
        loopingOnWords(words);
      }
    });
  }

  function init(element, config) {
    el = document.querySelector(element);
    props = config;

    props.typeSpeed = config.typeSpeed || 100;
    props.pause = config.pause || 400;
    props.loop = config.loop || false;

    el.insertAdjacentElement('afterend', cursor);
    let words = props.strings,
      len = words.length;

    loopingOnWords(words);
  }

  function increment(span, word, interval) {
    return new Promise(function(resolve, reject)  {
      for (let i = 0; i < word.length; i++) {
        count = 0;
        let wordIndex = i;
        let len = word.length;
        setTimeout(function (i) {
          appendWord(span, word.charAt(wordIndex));
          count++;
          if (count === len - 1) {
            resolve();
          }
        }, props.typeSpeed * i);
      }
    })
  }

  function appendWord(el, word) {
    el.innerHTML += word;
  }

  function iterateWords(element, word, index, wordsLengthArray) {
    return new Promise(function(resolve, reject){
      increment(element, word).then(function() {
        setTimeout(function () {
          decrement(element, word, index, wordsLengthArray).then(function() {
            resolve();
          });
        }, (props.pause || props.typeSpeed * 2))
      });
    })
  }

  function interateInsideDecrement(span, word, len, resolve) {
    for (var i = len; i > 0; i--) {
      let iteratedI = i;
      let count = len;
      setTimeout(function (i) {
        span.innerHTML = word.substring(0, len - iteratedI)
        count--;
        if (iteratedI === 1) {
          resolve();
        }
      }, props.typeSpeed / 2 * i);
    }
  }

  function decrement(span, word, index, lengthWords) {
    return new Promise(function(resolve, reject){
      let len = word.length;
      if (!props.loop && index + 1 === lengthWords) {
        span.innerHTML = word;
      } else if (props.loop) {
        interateInsideDecrement(span, word, len, resolve);
      } else if (index + 1 !== lengthWords) {
        interateInsideDecrement(span, word, len, resolve);
      }

    })
  }
  return {init}
}(this)));