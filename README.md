# iTyped

[![npm package](https://img.shields.io/badge/npm-v0.0.2-blue.svg)](https://www.npmjs.com/package/ityped)

> Dead simple Animated typing, with no dependencies.

---

<p align="center">
  <img src="img/itypedjs.gif" widt="400"/>
</p>

[iTyped Website ➞](https://ityped.surge.sh/)

Enter in any string, and watch it type at the speed you've set, backspace what it's typed, 
and begin a new sentence for however many strings you've set.

### Why should you use iTyped?
 * iTyped has a tiny size: ~1.9kb;
 * No jQuery dependency;
 
At now, if you just need to render Strings, **iTyped** is the best solution for you.

#### Install

Npm: `npm install ityped` </br>
CDN: `https://unpkg.com/ityped@0.0.2`


#### The Gist:

```javascript
import { init } from 'ityped';

init(`#element`, {
  // required - for now, only acceptting texts.
  strings: ['Dead simple animated typing.', 'No dependencies'],
  // optional
  typeSpeed: 90, //default: 70 - value in milliseconds
  // optional
  pause: 1000, //default: 500 - value in milliseconds
  // optional
  loop: true //default: false
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
  * @param {Integer} typeSpeed The value of type speed in milliseconds
  * @param {Integer} pause The time between the actual string and the next string in milliseconds
  * @param {Boolean} loop If true, the typed animation will be always activated
  **/
 
  const config = {
    strings: [
      'Dead simple animated typing.', 
      'No dependencies'
    ],
    typeSpeed: 120, // default: 70
    pause: 500, // default: 500
    loop: true // default: false
  }
```
