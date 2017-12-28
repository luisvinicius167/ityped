import { setProps } from './props'
import { getElement } from './element'
import { insertCursor, getCursor } from './cursor'
import { start } from './writing'

const init = (el, config) => {
  const 
    props = setProps(config || {}), 
    element = getElement(el)
  insertCursor(element, getCursor(props), props)
  start(element, props)
}

export {
  init
}