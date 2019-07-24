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

        // is the response done
        if (req.readyState == XMLHttpRequest.DONE ) {

          /**
           * anything that is not in the two hundreds is an error and if the
           * responseText is null that means it failed
           */
          if (req.status >= 200
            && req.status < 300
            && req.responseType === 'json'
            && req.response) {

            resolve(req.response);

          } else {

            reject(new Error(`JSON Error Status: ${req.status} responeType: ${req.responseType} (should be json)`));

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


      req.addEventListener('load', onLoad);
      req.addEventListener('error', onError);
      req.addEventListener('abort', onAbort);


      req.open('GET', jsonURL, true);

      // IE has a problem if this is before the open
      req.timeout = timeout;
      req.ontimeout = onTimeout;

      req.send(null);

    });

  }

}
