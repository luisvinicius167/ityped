# iTyped

[![npm package](https://img.shields.io/badge/npm-v0.0.10-lightgray.svg)](https://www.npmjs.com/package/ityped)

> Dead simple Animated typing, with no dependencies.

---

<p align="center">
  <img src="https://cdn.rawgit.com/luisvinicius167/ityped/master/img/itypedjs.gif" width="400"/>
</p>

[iTyped Website ➞](https://ityped.surge.sh/)

Enter in any string, and watch it type at the speed you've set, backspace what it's typed,
and begin a new sentence for however many strings you've set.

## Why should you use iTyped?
 * iTyped has a tiny size: 2.3kB
 * No jQuery dependency
 * Just install and enjoy!

At now, if you just need to render Strings, **iTyped** is the best solution for you.


#### Install

Npm: `npm install ityped` </br>
CDN: `https://unpkg.com/ityped@0.0.10`


#### The Gist:

```javascript
import { init, destroy } from 'ityped';

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

iTyped Configuration

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
    // optional callback called (if `loop` is false) once the
    // last string was typed
    onFinished: function(){},
  }
```
