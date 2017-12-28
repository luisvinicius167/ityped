export const getCursor = props  => {
  const { cursorChar } = props
  const cursor = document.createElement('span')
  cursor.classList.add('ityped-cursor')
  cursor.textContent = cursorChar
  return cursor
}

export const insertCursor = (element, cursor, props) => 
  props.showCursor 
  ? element.insertAdjacentElement('afterend', cursor)
  : null