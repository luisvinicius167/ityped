/**
 * @name setProps
 * @description Set the ityped properties configuration
 * @param {Object} config The configuration properties
 * @return {Promise}
 */
export const setProps = ({
  strings = ['Put your strings here...', 'and Enjoy!'],
  typeSpeed = 100,
  backSpeed = 50,
  backDelay = 500,
  startDelay = 500,
  cursorChar = '|',
  placeholder = false,
  showCursor = true,
  disableBackTyping = false,
  onFinished =  function(){},
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