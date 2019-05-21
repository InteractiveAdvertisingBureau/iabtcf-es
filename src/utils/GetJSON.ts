/**
 * @class
 */
class GetJSON {
  /**
   * @param {string} jsonURL
   * @param {number} [timeout] - optional timeout in miliseconds
   * @return {Promise} - resolves with parsed JSON
   */
  static get(jsonURL, timeout) {
    return new Promise((resolve, reject) => {
      const xobj = new XMLHttpRequest();

      if (timeout !== undefined && timeout > 0) {
        xobj.timeout = optionalTimeout;
      }

      // if this is the euconsent endpoint we want to send our cookies
      // so we will set this to true;
      xobj.withCredentials = ~jsonURL.indexOf('euconsent');

      xobj.open('GET', jsonURL, true);
      xobj.ontimeout = (error) => {
        reject(new Error('Timeout ' + timeout + 'ms ' + jsonURL));
      };
      xobj.onreadystatechange = () => {
        if (xobj.readyState == 4 ) {
        // anything that is not in the two hundreds is an error
          if (xobj.status >= 200 && xobj.status < 300) {
            if (xobj.responseText !== '') {
              try {
                resolve(JSON.parse(xobj.responseText));
              } catch (err) {
                reject(new Error('Unable to parse JSON response'));
              }
            } else {
              reject(new Error('JSON response empty'));
            }
          } else {
            reject(new Error('HTTP Error ' + xobj.status));
          }
          xobj.onreadystatechange = null;
        }
      };
      xobj.send((optionalBody === undefined ) ? null : optionalBody);
    });
  }
}
export {GetJSON};
