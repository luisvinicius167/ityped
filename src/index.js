/**
 * @name setProps
 * @description Set the ityped properties configuration
 * @param {Object} config The configuration properties
 * @return {Promise}
 */
const setProps = ({
  strings = ['Put your strings here...', 'and Enjoy!'],
  typeSpeed = 100,
  backSpeed = 50,
  backDelay = 500,
  startDelay = 500,
  cursorChar = '|',
  placeholder = false,
  showCursor = true,
  disableBackTyping = false,
  onFinished = function () { },
  loop = true
}) => ({
  strings,
  typeSpeed,
  backSpeed,
  cursorChar,
  backDelay,
  placeholder,
  startDelay,
  showCursor,
  loop,
  disableBackTyping,
  onFinished
})

export const init = (element, properties) => {
  let i = 0, l, STRINGS_TO_ITERATE;

  const typewrite = (strings, props) => {
    if (i === l)
      if (props.loop) i = 0;
    setTimeout(() => { typeString(strings[i], props); }, props.startDelay);
  }

  const typeString = (str, props) => {
    let index = 0,
      strLen = str.length;
    let intervalID = setInterval(() => {
      props.placeholder ? element.placeholder += str[index] : element.textContent += str[index];
      if (++index === strLen) return onStringTyped(intervalID, props);
    }, props.typeSpeed);
  }

  const onStringTyped = (id, props) => {
    clearInterval(id);
    if (props.disableBackTyping && i === l - 1) {
      return props.onFinished()
    }
    if (!props.loop && i === l - 1) {
      return props.onFinished();
    }
    setTimeout(() => eraseString(props), props.backDelay);
  }

  const eraseString = (props) => {
    let str = props.placeholder ? element.placeholder : element.textContent,
      strLen = str.length;
    let intervalID = setInterval(() => {
      props.placeholder
        ? element.placeholder = element.placeholder.substr(0, --strLen)
        : element.textContent = str.substr(0, --strLen);
      if (strLen === 0) return onStringErased(intervalID, props);
    }, props.backSpeed);
  }

  const onStringErased = (id, props) => {
    clearInterval(id);
    ++i;
    typewrite(STRINGS_TO_ITERATE, props);
  }

  const setCursor = (element, props) => {
    let cursorSpan = document.createElement('span');
    cursorSpan.classList.add('ityped-cursor');
    cursorSpan.textContent = '|';
    cursorSpan.textContent = props.cursorChar;
    element.insertAdjacentElement('afterend', cursorSpan);
  }


  const startTyping = (prop) => {
    let props = setProps(prop || {})
    let strings = props.strings
    STRINGS_TO_ITERATE = strings
    l = strings.length
    if (typeof element === "string") element = document.querySelector(element)
    if (props.showCursor) setCursor(element, props)
    typewrite(strings, props)
  }

  return startTyping(properties)
}