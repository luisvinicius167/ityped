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

  let element,
      props = {},
      cursorSpan = document.createElement('span');

  cursorSpan.classList.add('ityped-cursor');
  cursorSpan.textContent = '|';

  let STRINGS,
      i = 0,
      l;

  function init(
    id,
    strings = ['Put your string here.', 'Nice, uh?'],
    {
      typeSpeed = 100,
      backSpeed = 50,
      startDelay = 500,
      backDelay = 500,
      cursor = '|',
      loop = false,
      onFinished
    } = {}  // configs are optional
  ) {

    element = document.getElementById(id);

    props.typeSpeed = typeSpeed;
    props.backSpeed = backSpeed;
    props.backDelay = backDelay || 0;   // adressess backDelay: false
    props.startDelay = startDelay || 0; // adressess startDelay: false
    props.loop = loop;

    if (onFinished) props.onFinished = onFinished;

    STRINGS = strings;
    l = strings.length;

    if (cursor) {
      cursorSpan.textContent = cursor;
      element.insertAdjacentElement('afterend', cursorSpan);
    }

    typewrite(strings);
  }

  function typewrite(strings) {
    if (i === l)
      if (props.loop) i = 0;  // should always be the case
      else return;            // probably not usefull

    setTimeout(() => { typeString(strings[i]); }, props.startDelay);

  }

  function typeString(str) {
    let index = 0,
        strLen = str.length;

    let intervalID = setInterval(() => {
      element.textContent += str[index];
      if (++index === strLen) return onStringTyped(intervalID);
    }, props.typeSpeed);
  }

  function onStringTyped(id) {
    clearInterval(id);
    if (!props.loop && i === l - 1)   // if no loop, don’t erase last string
      return (props.onFinished) ? props.onFinished() : null;
    setTimeout(eraseString, props.backDelay);
  }

  function eraseString() {
    let str = element.textContent,
        strLen = str.length;

    let intervalID = setInterval(() => {
      element.textContent = str.substr(0,--strLen);
      if (strLen === 0) return onStringErased(intervalID);
    }, props.backSpeed);
  }

  function onStringErased(id) {
    clearInterval(id);
    ++i;
    typewrite(STRINGS);
  }

  return {init};
}(this)));
