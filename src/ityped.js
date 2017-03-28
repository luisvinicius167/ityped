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
      init: factory.init,
      destroy: factory.destroy
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
  	cursor.classList.add('ityped-cursor');
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

    return Promise.resolve(props);
  }
  /**
   * @name init
   * @param { String || Element } element The element that will receive the strings
   * @param {Object} config The initial configuration
   */
  function init(element, config) {
    typeof element === 'string'
      ? element = document.querySelector(element)
      : element = element;
    setProps(config).then(function(properties){
      props = properties;
      element._props = props;
	  // init cursor if needed
	  if (props.showCursor) {
          initCursorOn(element, props.cursorChar || '|');
	  }
      loopingOnWords(element);
    })
  }

  function initCursorOn(element, cursorChar) {
      const newCursor = cursor.cloneNode();
	  element.insertAdjacentElement('afterend', newCursor);
      newCursor.textContent = cursorChar;
  }

  /**
   * @name loopingOnWords
   * @description Loop on each string passed
   * @param {HTMLElement} 	element 	The element to handle the animation on
   * @param {Array} words The array that contain the words
   */
  function loopingOnWords(element) {
    forEach(element._props.strings, function (word, index, arr) {
      let time = (element._props.typeSpeed * word.length - 1);
      /**
       * set the correct time
       * with the differences of type and back
       * speed
       */
      if (element._props.backSpeed < element._props.typeSpeed) {
        time -= (element._props.typeSpeed - element._props.backSpeed) * word.length;
    } else if (element._props.backSpeed > element._props.typeSpeed) {
        time += (element._props.backSpeed - element._props.typeSpeed) * word.length;
      }
      let done = this.async();
      let len = element._props.strings.length;
      iterateWords(element, word, index, len).then(function () {
        setTimeout(function () {
          done();
        }, time)
      })
    }, function () {
      if (element._props.loop) {
        loopingOnWords(element);
      }
    });
  }
  /**
   * @name increment
   * @description Increment each letter and append it on element
   * @param {Element} element The Element that will receive the letters
   * @param {String} word The string that will be looped to
   * get each letter
   * @return {Promise}
   */
  function increment(element, word) {
    return new Promise(function (resolve, reject) {
        let count = 0;
      for (let i = 0; i < word.length; i++) {
        let wordIndex = i;
        let len = word.length;
        setTimeout(function (i) {
          appendWord(element, word.charAt(wordIndex));
          count++;
          if (count === len - 1) {
            resolve();
          }
        }, element._props.typeSpeed * i);
      }
    })
  }
  /**
   * @name appendWord
   * @description Append each letter on Element
   * @param {Element} element The Element that will receive the letter
   * @param {String} word The string that will be appended
   */
  function appendWord(element, word) {
    element.innerHTML += word;
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
      increment(element, word)
        .then(function () {
          setTimeout(function () {
            decrement(element, word, index, wordsLengthArray)
              .then(function () {
                setTimeout(function(){
                  resolve();
                }, element._props.startDelay)
              });
          }, element._props.backDelay)
        });
    });
  }
  /**
   * @name iterateInsideDecrement
   * @description Iterate on each word, inside the decrement function for decrement the word
   * @param {Element} element The Element that will receive the letters of word
   * @param {String} word The string that is the word
   * @param {Integer} len The length of words Array
   * @param {Promise} resolve The Promise.resolve method that will be trigerred when
   * the decrement iteration are finished
   * @return {Promise}
   */
  function iterateInsideDecrement(element, word, len, resolve) {
    for (let i = len; i > 0; i--) {
      let iteratedI = i, count = len;
      setTimeout(function (i) {
        element.innerHTML = word.substring(0, len - iteratedI)
        count--;
        if (iteratedI === 1) {
          resolve();
        }
      }, element._props.backSpeed * i);
    }
  }

  /**
   * @name decrement
   * @description decrement the word in the correct case
   * @param {Element} element The Element that will receive the letters of word
   * @param {String} word The string that is the word
   * @param {Integer} index The index of the Array that contain the word
   * @param {Integer} lengthWords The length of words Array
   */
  function decrement(element, word, index, lengthWords) {
    return new Promise(function (resolve, reject) {
      let len = word.length;
      // if is the last letter and the last word and no loop
      if (index + 1 === lengthWords) {
        if (!element._props.loop) {
        // when the last word
          if (element._props.onFinished !== undefined && typeof element._props.onFinished === "function"){
              element._props.onFinished();
          }
          element.innerHTML = word;
        }
        else if (element._props.loop) {
          iterateInsideDecrement(element, word, len, resolve);
        }
      } else if (index + 1 !== lengthWords) {
        iterateInsideDecrement(element, word, len, resolve);
      }
    })
  }

  /**
   * @name destroy
   * @description destroy the onFinished function
   */
  function destroy (element) {
    element._props.onFinished = function(){return void 0};
  }

  /**
   * Return the init function
   */
  return {init, destroy}
}(this)));
