class Json {

  /**
   * @param {string} jsonURL - full path to the json
   * @param {boolean} sendCookies - Whether or not to send the XMLHttpRequest with credentials or not
   * @param {number} [timeout] - optional timeout in miliseconds
   * @return {Promise} - resolves with parsed JSON
   */
  public static fetch(jsonURL: string, sendCookies: boolean = false, timeout: number = NaN): Promise<object> {

    return new Promise((resolve: (response: object) => void, reject: (error: Error) => void): void => {

      const xobj: XMLHttpRequest = new XMLHttpRequest();

      // if timeout is defined and greater than zero we'll set it otherwise, no...
      if (timeout !== NaN && timeout > 0) {

        xobj.timeout = timeout;

      }

      // send cookies
      xobj.withCredentials = sendCookies;
      xobj.ontimeout = (): void => {

        reject(new Error('Timeout ' + timeout + 'ms ' + jsonURL));

      };
      xobj.onreadystatechange = (): void => {

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

      // execute GET request (will require CORS)
      xobj.open('GET', jsonURL, true);
      xobj.send(null);

    });

  }

}
export {Json};
