export const getElement = element => 
  typeof element === "string" 
    ? document.querySelector(element)
    : element