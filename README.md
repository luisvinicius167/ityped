# iTyped

[![npm package](https://img.shields.io/badge/npm-v0.0.4-lightgray.svg)](https://www.npmjs.com/package/ityped)

> Dead simple Animated typing, with no dependencies.

---

<p align="center">
  <img src="https://cdn.rawgit.com/luisvinicius167/ityped/master/img/itypedjs.gif" widt="400"/>
</p>

[iTyped Website ➞](https://ityped.surge.sh/)

Enter in any string, and watch it type at the speed you've set, backspace what it's typed, 
and begin a new sentence for however many strings you've set.

### Why should you use iTyped?
 * iTyped has a tiny size: 2.4kb.
 * No jQuery dependency
 * Just install and enjoy!
 
At now, if you just need to render Strings, **iTyped** is the best solution for you.

#### Install

Npm: `npm install ityped` </br>
CDN: `https://unpkg.com/ityped@0.0.4`


#### The Gist:

```javascript
import { init } from 'ityped';

init(`#element`, {
  // required - for now, only acceptting texts.
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
    loop: false //default
    //optional    
    cursorChar: "|", //default
    // optional callback called when the last string was typed
    onFinished: function(){},
});
```

#### Want the animated blinking cursor? Add this CSS.

```css
.typed-cursor{
    opacity: 1;
    -webkit-animation: blink 0.7s infinite;
    -moz-animation: blink 0.7s infinite;
    animation: blink 0.7s infinite;
}
@keyframes blink{
    0% { opacity:1; }
    50% { opacity:0; }
    100% { opacity:1; }
}
@-webkit-keyframes blink{
    0% { opacity:1; }
    50% { opacity:0; }
    100% { opacity:1; }
}
@-moz-keyframes blink{
    0% { opacity:1; }
    50% { opacity:0; }
    100% { opacity:1; }
}
```

### API

 Init
 
```javascript
/**
 * @name init
 * @description Init the typed animation
 * @param {String} element The Element that will be receive the strings
 * @param {Object} config The typed configuration
 */
 
 init('#element', config);
```

```html

<span id="element"></span>

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
  * @param {Boolean} loop The animation loop
  * @param {Function} onFinished The callback that will called if the loop are false and when the last word are
  * decremented
  **/
 
  const config = {
    strings: ['Dead simple animated typing.', 'No dependencies'],
    //optional
    typeSpeed: 100, //default
    //optional
    backSpeed: 50, //default
    //optional 
    startDelay: 500, //default
    //optional
    backDelay: 500, //default
    //optional    
    loop: false //default
    //optional    
    cursorChar: "|", //default
    // optional callback called when the last string was typed.
    // and if the loop are false
    onFinished: function(){},
  }
```