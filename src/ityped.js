/**
 * @name ityped
 * @description Dead simple Animated Typing with no dependencies
 * @author Luis Vinícius
 * @email luis@uilabs.me
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
  /**
   * async foreach
   * https://www.npmjs.com/package/async-foreach
   */
    const forEach = function (a, b, c) {
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
      })();
    };


  /**
   * el is the element
   */
  let selectedElement,
    props,
    /**
    * creating the cursor
    */
    cursor = document.createElement('span');
  cursor
    .classList
    .add('ityped-cursor');
  cursor.textContent = '|';

  /**
   * @name setProps
   * @description Set the ityped properties configuration
   * @param {Object} config The configuration properties
   * @return {Promise}
   */
  function setProps ( config ) {
    let props = config;
    props.strings    = config.strings    || ['Put your string here...', 'and Enjoy!']
    props.typeSpeed  = config.typeSpeed  || 100;
    props.backSpeed  = config.backSpeed  || 50;
    props.backDelay  = config.backDelay  || 500;
    props.startDelay = config.startDelay || 500;
    props.showCursor = config.showCursor;
    props.loop       = config.loop       || false;

    if (props.showCursor === undefined) props.showCursor = true;
    if (props.showCursor) selectedElement.insertAdjacentElement('afterend', cursor);
    if (props.cursorChar !== undefined) cursor.textContent = props.cursorChar;

    return Promise.resolve(props);
  }
  /**
   * @name init
   * @param {String} element The element that will receive the strings
   * @param {Object} config The initial configuration
   */
  function init(element, config) {
    selectedElement = document.querySelector(element);
    setProps(config).then(function(properties){
      props = properties;
      loopingOnWords(props.strings);
    })
  }

  /**
   * @name loopingOnWords
   * @description Loop on each string passed
   * @param {Array} words The array that contain the words
   */
  function loopingOnWords(words) {
    forEach(words, function (word, index, arr) {
      let time = (props.typeSpeed * word.length - 1);
      /**
       * set the correct time
       * with the differences of type and back
       * speed
       */
      if (props.backSpeed < props.typeSpeed) {
        time -= (props.typeSpeed - props.backSpeed) * word.length;
      } else if (props.backSpeed > props.typeSpeed) {
        time += (props.backSpeed - props.typeSpeed) * word.length;
      }
      let done = this.async();
      let len = words.length;
      iterateWords(selectedElement, word, index, len).then(function () {
        setTimeout(function () {
          done();
        }, time)
      })
    }, function () {
      if (props.loop) {
        loopingOnWords(words);
      }
    });
  }
  /**
   * @name increment
   * @description Increment each letter and append it on element
   * @param {Element} selectedElement The Element that will receive the letters
   * @param {String} word The string that will be looped to
   * get each letter
   * @return {Promise}
   */
  function increment(selectedElement, word) {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < word.length; i++) {
        count = 0;
        let wordIndex = i;
        let len = word.length;
        setTimeout(function (i) {
          appendWord(selectedElement, word.charAt(wordIndex));
          count++;
          if (count === len - 1) {
            resolve();
          }
        }, props.typeSpeed * i);
      }
    })
  }
  /**
   * @name appendWord
   * @description Append each letter on Element
   * @param {Element} selectedElement The Element that will receive the letter
   * @param {String} word The string that will be appended
   */
  function appendWord(selectedElement, word) {
    selectedElement.innerHTML += word;
  }

  /**
   * @name iterateWords
   * @description Iterate on each word, incrementing and decrementing
   * @param {Element} selectedElement The Element that will receive the letters of word
   * @param {String} word The string that is the word
   * @param {Integer} index The index position of the words Array
   * @param {Integer} wordsLengthArray The length of words Array
   * @return {Promise}
   */
  function iterateWords(selectedElement, word, index, wordsLengthArray) {
    return new Promise(function (resolve, reject) {
      increment(selectedElement, word)
        .then(function () {
          setTimeout(function () {
            decrement(selectedElement, word, index, wordsLengthArray)
              .then(function () {
                setTimeout(function(){
                  resolve();
                }, props.startDelay)
              });
          }, props.backDelay)
        });
    });
  }
  /**
   * @name iterateInsideDecrement
   * @description Iterate on each word, inside the decrement function for decrement the word
   * @param {Element} selectedElement The Element that will receive the letters of word
   * @param {String} word The string that is the word
   * @param {Integer} len The length of words Array
   * @param {Promise} resolve The Promise.resolve method that will be trigerred when
   * the decrement iteration are finished
   * @return {Promise}
   */
  function iterateInsideDecrement(selectedElement, word, len, resolve) {
    for (let i = len; i > 0; i--) {
      let iteratedI = i, count = len;
      setTimeout(function (i) {
        selectedElement.innerHTML = word.substring(0, len - iteratedI)
        count--;
        if (iteratedI === 1) {
          resolve();
        }
      }, props.backSpeed * i);
    }
  }

  /**
   * @name decrement
   * @description decrement the word in the correct case
   * @param {Element} selectedElement The Element that will receive the letters of word
   * @param {String} word The string that is the word
   * @param {Integer} index The index of the Array that contain the word
   * @param {Integer} lengthWords The length of words Array
   */
  function decrement(selectedElement, word, index, lengthWords) {
    return new Promise(function (resolve, reject) {
      let len = word.length;
      // if is the last letter and the last word and no loop
      if (index + 1 === lengthWords) {
        if (!props.loop) {
        // when the last word
          if (props.onFinished !== undefined && typeof props.onFinished === "function"){
              props.onFinished();
          }
          selectedElement.innerHTML = word;
        }
        else if (props.loop) {
          iterateInsideDecrement(selectedElement, word, len, resolve);
        }
      } else if (index + 1 !== lengthWords) {
        iterateInsideDecrement(selectedElement, word, len, resolve);
      }
    })
  }

  /**
   * Return the init function
   */
  return {init}
}(this)));
