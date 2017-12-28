const getCursor = () => {
  const cursor = document.createElement('span');
  cursor.classList.add('ityped-cursor');
  cursor.textContent = '|';
  return cursor
}

const insertCursor = (element, cursor) => element.insertAdjacentElement('afterend', cursor);
const appendElement = parent => child => document.querySelector(parent).appendChild(child)
const getElement = el => document.querySelector(el)


/**
 * @name setProps
 * @description Set the ityped properties configuration
 * @param {Object} config The configuration properties
 * @return {Promise}
 */
const setProps = ({
  strings = ['AEIOU asiahsa skaonsa', 'SZsiasa'],
  typeSpeed = 100,
  backSpeed = 300,
  backDelay = 100,
  startDelay = 100,
  showCursor = true,
  loop = true
}) => ({
  strings,
  typeSpeed,
  backSpeed,
  backDelay,
  startDelay,
  showCursor,
  loop
})

const startLoop = (element, props) => {
  const times = []
  const { strings, startDelay, typeSpeed, backSpeed, backDelay, loop } = props
  const len = strings.length
  for (let i=0; i < strings.length; i++) {
    const len = strings[i].length
    const nextTime = (len * typeSpeed) + startDelay + ( len * backSpeed ) + backDelay
    times.push(nextTime)
    const time = i === 0 ? startDelay : times[i-1]
    startWriting(element, i, props, time)
  }
}
const init = (el, config) => {
  const props = setProps(config)
  const element = getElement(el)
  const initCursor = appendElement(el)
  insertCursor(element, getCursor())
  const times = []
  startLoop(element, props)
}

const startWriting = (el, position, props, time) => {
  const word = props.strings[position]
  let i = 0
  const startTick = window.setTimeout(() => {
    Array.from(word)
      .forEach((letter, i) =>
        setTimeout(() => typeString(word, i, el, props), props.typeSpeed * (i + 1))
      )
  }, time)
}

const typeString = (word, i, el, props) => {
  if (i === word.length - 1) {
    return window.setTimeout(() => {
      let k = 0
      let tick
      for (let l = word.length -1; l >= 0; l--) {
        k += 1
        tick = setTimeout(() => eraseString(l, el, props, word), props.backSpeed * k)
      }
      clearTimeout(tick)
    }, props.backDelay)
  }
  el.innerHTML += word[i]
}

const eraseString = ( i, el, props, word ) => {
  el.innerHTML = el.innerHTML.substring(0, --i)
  if ( i === 0 && props.strings.indexOf(word) === props.strings.length - 1 && props.loop) {
      startLoop(el, props)
  }
}


export {
  init
}