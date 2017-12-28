/**
 * @name setProps
 * @description Set the ityped properties configuration
 * @param {Object} config The configuration properties
 * @return {Promise}
 */
export const setProps = ({
  strings = ['Put your strings here...', 'and Enjoy!'],
  typeSpeed = 100,
  backSpeed = 100,
  backDelay = 1200,
  startDelay = 100,
  cursorChar = '|',
  showCursor = true,
  stopLastWord = false,
  onFinished =  function(){},
  loop = true
}) => ({
  strings,
  typeSpeed,
  backSpeed,
  cursorChar,
  backDelay,
  startDelay,
  showCursor,
  loop,
  stopLastWord,  
  onFinished
})