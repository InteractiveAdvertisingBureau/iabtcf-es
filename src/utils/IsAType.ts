/**
 * isAString function for returning whether the proposed value is a string
 *
 * @param {any} [val] - the thing to check to see if it's a string
 * @return {boolean} - whether or not it's a string, of course...
 */
function isAString(val) {

  return (typeof val === 'string');

}

/**
 * isAFunction  function for returning whether the proposed value is a function
 *
 * @param {any} [val] - the thing to check to see if it's a string
 * @return {boolean} - whether or not it's a function, of course...
 */
function isAFunction(val) {

  return (typeof val === 'function');

}
export {isAString, isAFunction};
