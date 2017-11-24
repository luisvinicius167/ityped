# ityped2

[![License MIT](https://img.shields.io/npm/l/ityped2.svg)](https://github.com/zhuweiyou/ityped2/blob/master/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/ityped2.svg)](https://www.npmjs.com/package/ityped2)
[![NPM Download](https://img.shields.io/npm/dt/ityped2.svg)](https://www.npmjs.com/package/ityped2)

> Dead simple Animated typing, with no dependencies.

---

Enter in any string, and watch it type at the speed you've set, backspace what it's typed,
and begin a new sentence for however many strings you've set.

## Why should you use iTyped2?
 * iTyped has a tiny size: 2.3kB
 * No jQuery dependency
 * Just install and enjoy!

At now, if you just need to render Strings, **iTyped2** is the best solution for you.


#### Install

Npm: `npm install ityped2` </br>


#### The Gist:

```javascript
import { init, destroy } from 'ityped2';

init(`#element`, {
  // required - for now, only accepting texts
    strings: ['Dead simple animated typing.', 'No dependencies'],
    //optional
    typeSpeed: 55, //default
    //optional
    backSpeed: 30, //default
    //optional
    startDelay: 500, //default
    //optional
    backDelay: 500, //default
    //optional
    loop: false, //default
    //optional    
    showCursor: true, //default
    //optional    
    cursorChar: "|", //default
    //optional
    cursorClass: 'ityped-cursor', //default
    // optional callback called once the last string has been typed
    onFinished: function(){}
});
```

#### Want the animated blinking cursor? Add this CSS and customize as you want!

```css
.ityped-cursor {
    font-size: 2.2rem;
    opacity: 1;
    -webkit-animation: blink 0.3s infinite;
    -moz-animation: blink 0.3s infinite;
    animation: blink 0.3s infinite;
    animation-direction: alternate;
}

@keyframes blink {
    100% {
        opacity: 0;
    }
}

@-webkit-keyframes blink {
    100% {
        opacity: 0;
    }
}

@-moz-keyframes blink {
    100% {
        opacity: 0;
    }
}
```

### API

 Init

```javascript
/**
 * @name init
 * @description Init the typed animation
 * @param {String || Element } element The Element that will receive the strings
 * @param {Object} config The typed configuration
 */
 const element = document.querySelector('#element')
 // you can
 init(element, config);
 // or
 init('#element', config);
```

```html

<span id="element"></span>

```

 Destroy

```javascript
/**
 * @name destroy
 * @description Destroy the onFinished function
 * @param  {HTMLElement}  element   The element on which the ityped animation is applied
 */

 destroy();
```

iTyped2 Configuration

```javascript
/**
  * @name config
  * @description The initial typed configuration
  * @param {Array} strings An array with the strings that will be animated
  * @param {Integer} typeSpeed Typing speed
  * @param {Integer} backSpeed Backspacing speed
  * @param {String} cursorChar The value of cursor character
  * @param {Integer} backDelay Time before backspacing
  * @param {Integer} startDelay Time before typing starts
  * @param {Boolean} showCursor Show the cursor element
  * @param {Boolean} loop The animation loop
  * @param {Function} onFinished The callback that will be called (if `loop` is false) once the last word is decremented
  **/

  const config = {
    strings: ['Dead simple animated typing.', 'No dependencies'],
    //optional
    typeSpeed:  100, //default
    //optional
    backSpeed:  50, //default
    //optional
    startDelay: 500, //default
    //optional
    backDelay:  500, //default
    //optional    
    loop:       false, //default
    //optional
    showCursor: true, //default
    //optional    
    cursorChar: "|", //default
    //optional
    cursorClass: 'ityped-cursor', //default
    // optional callback called (if `loop` is false) once the
    // last string was typed
    onFinished: function(){},
  }
```
