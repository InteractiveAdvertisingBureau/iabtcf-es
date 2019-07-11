export class Json {

  /**
   * @param {string} jsonURL - full path to the json
   * @param {boolean} sendCookies - Whether or not to send the XMLHttpRequest with credentials or not
   * @param {number} [timeout] - optional timeout in miliseconds
   * @return {Promise} - resolves with parsed JSON
   */
  public static fetch(jsonURL: string, sendCookies: boolean = false, timeout: number = 0): Promise<object> {

    return new Promise((resolve: (response: object) => void, reject: (error: Error) => void): void => {

      const req: XMLHttpRequest = new XMLHttpRequest();
      const onLoad: (evt: Event) => void = (): void => {

        if (req.readyState == 4 ) {

          // anything that is not in the two hundreds is an error
          if (req.status >= 200 && req.status < 300) {

            if (req.responseText === '') {

              reject(new Error('JSON response empty'));

            } else {

              resolve(req.response);

            }

          } else {

            reject(new Error('HTTP Error ' + req.status));

          }

        }

      };
      const onError: (evt: Event) => void = (): void => {

        reject(new Error('fetch error'));

      };
      const onAbort: (evt: Event) => void = (): void => {

        reject(new Error('fetch aborted'));

      };
      const onTimeout: () => void = (): void => {

        reject(new Error('Timeout ' + timeout + 'ms ' + jsonURL));

      };

      req.responseType = 'json';
      req.withCredentials = sendCookies;
      req.timeout = timeout;
      req.ontimeout = onTimeout;


      req.addEventListener('load', onLoad);
      req.addEventListener('error', onError);
      req.addEventListener('abort', onAbort);


      req.open('GET', jsonURL, true);
      req.send(null);

    });

  }

}
