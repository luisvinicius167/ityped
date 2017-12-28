const typeString = (word, i, el, props) => {
  if (i === word.length - 1) {
    window.setTimeout(() => {
      let k = 0
      for (let l = word.length - 1; l >= 0; l--) {
        k += 1
        if (props.disableBackTyping && isLastLetterOfLastString(word, props) && !props.loop) {
          return props.onFinished()
        }
        setTimeout(() => eraseString(l, el, props, word), props.backSpeed * k)
      }
    }, props.backDelay)
  }

  props.placeholder ? el.placeholder += word[i] : el.innerHTML += word[i]
}

const isLastLetterOfLastString = (word, props) => 
  props.strings.indexOf(word) === props.strings.length - 1

const eraseString = (i, el, props, word) => {
  props.placeholder 
    ? el.placeholder = el.placeholder.substring(0, --i)
    : el.innerHTML = el.innerHTML.substring(0, --i)

  if (i === 0
    && isLastLetterOfLastString(word, props)
    && props.loop
  ) {
    start(el, props)
  } else if (isLastLetterOfLastString(word, props) && !props.loop) {
    props.onFinished()
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
  const arrLen = strings.length
  for (let i = 0; i < arrLen; i++) {
    const len = strings[i].length
    const nextTime = (len * typeSpeed) + startDelay + (len * backSpeed) + backDelay
    times.push(nextTime)
    const time = i === 0 ? startDelay : startDelay + times[i - 1]
    writeString(element, i, props, time)
  }
}