const typeString = (word, i, el, props) => {
  if (i === word.length - 1) {
    return window.setTimeout(() => {
      let k = 0
      for (let l = word.length -1; l >= 0; l--) {
        k += 1
        console.log(props.stopLastWord)
        if (props.stopLastWord && ( props.strings.indexOf(word) === props.strings.length - 1)) {
          return props.onFinished()
        }
        setTimeout(() => eraseString(l, el, props, word), props.backSpeed * k)
      }
    }, props.backDelay)
  }
  el.innerHTML += word[i]
}

const eraseString = ( i, el, props, word ) => {
  el.innerHTML = el.innerHTML.substring(0, --i)
  if ( i === 0 
      && props.strings.indexOf(word) === props.strings.length - 1 
      && props.loop
  ) {
    props.onFinished ? props.onFinished() : null
    start(el, props)
  }
}

const writeString = (el, position, props, time) => {
  const word = props.strings[position]
  let i = 0
  const startTick = window.setTimeout(
    () => {
      Array.from(word)
        .forEach((letter, i) =>
          setTimeout(() => typeString(word, i, el, props), props.typeSpeed * (i + 1))
        )
    }, time)
}

export const start = (element, props) => {
  const times = []
  const { strings, startDelay, typeSpeed, backSpeed, backDelay, loop } = props
  const len = strings.length
  for (let i=0; i < strings.length; i++) {
    const len = strings[i].length
    const nextTime = (len * typeSpeed) + startDelay + ( len * backSpeed ) + backDelay
    times.push(nextTime)
    const time = i === 0 ? startDelay : times[i-1]
    writeString(element, i, props, time)
  }
}