
const getCursor = () => {
  const cursor = document.createElement('span');
  cursor.classList.add('ityped-cursor');
  cursor.textContent = '|';
  return cursor
}

/**
 * @name setProps
 * @description Set the ityped properties configuration
 * @param {Object} config The configuration properties
 * @return {Promise}
 */
const setProps = ({
  strings = ['AEIOU asiahsa skaonsa', 'SZsiasa'],
  typeSpeed = 100,
  backSpeed = 100,
  backDelay = 100,
  startDelay = 100,
  showCursor = true,
  loop = false
}) => ({ strings, typeSpeed, backSpeed, backDelay, startDelay, showCursor, loop })

const insertCursor = (element, cursor) => element.insertAdjacentElement('afterend', cursor);
const appendElement = parent => child => document.querySelector(parent).appendChild(child)
const getElement = el => document.querySelector(el)

const init = (el, config) => {
  const props = setProps(config)
  const initCursor = appendElement(el)
  insertCursor(getElement(el), getCursor())
  walkWithWords(el, props)
}

// const iterate = (s) => {
//   const w = 
// }

// Pega o array e itera na primeira posição
const walkWithWords = (el, { strings, typeSpeed, backSpeed, backDelay, startDelay, showCursor, loop }) => {
  const element = getElement(el)
  const times = []
  return Promise.all(strings.map((string, index ) => {
    return ((i) => {
      const len = string.length - 1
      let time = startDelay + (len * typeSpeed) + (len * backSpeed)
      times.push(time)
      const nextTime = times[i - 1]
      const t = window.setTimeout(
        () =>
          incrementWord(
            i,
            time= index === 0 ? startDelay : time,
            decrementWord,
            element,
            { strings, typeSpeed, backSpeed, backDelay, startDelay, showCursor, loop }
          )
        , startDelay)
    })(index)
  }))
}

// const incrementWord = (
//   i,
//   time,
//   el,
//   { strings, typeSpeed, backSpeed, backDelay, startDelay, showCursor, loop }
// ) => {
//   return decrement => {
//     window.setTimeout(() => {
//       console.log('inc', time)
//       Array.prototype.forEach.call(strings[i], (letter, index, arr) => {
//         const t = window.setTimeout(() => {
//           el.innerHTML += letter
//           if (index === arr.length - 1) {
//             window.clearTimeout(t)
//             decrement(i, time, el, { strings, typeSpeed, backSpeed, backDelay, startDelay, showCursor, loop })
//           }
//         }, typeSpeed * index)
//       }) 
//     }, i === 0 ? startDelay : time + startDelay)
//   }
// }

const incrementWord = (
  i,
  time,
  decrement,
  el,
  { strings, typeSpeed, backSpeed, backDelay, startDelay, showCursor, loop }
) => {
  return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        Array.prototype.forEach.call(strings[i], (letter, index, arr) => {
          const t = window.setTimeout(() => {
            el.innerHTML += letter
            if (index === arr.length - 1) {
              window.clearTimeout(t)
              decrement(
                i, 
                time,
                el, 
                { strings, typeSpeed, backSpeed, backDelay, startDelay, showCursor, loop },
                resolve
              )
            }
          }, typeSpeed * index)
        }) 
      }, time)
  })
}

const decrementWord = (
  i,
  time,
  el,
  { strings, typeSpeed, backSpeed, backDelay, startDelay, showCursor, loop },
  resolve
) => {
  window.setTimeout(() => {
    Array.prototype.forEach.call(strings[i], (letter, index, arr) => {
      const position = el.innerHTML.length - index
      const tick = window.setTimeout(() => {
        index === arr.length - 1
          ? el.innerHTML = el.innerHTML.substring(0, position - 1)
          : el.innerHTML = el.innerHTML.substring(0, position)
        if (index === arr.length - 1) {
          window.clearTimeout(tick)
          resolve()
        }
      }, backSpeed * index)
    })
  }, time)

}

export { init }