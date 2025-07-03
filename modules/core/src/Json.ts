export class Json {

  private static absCall(url: string, body: string | null, sendCookies: boolean, timeout: number): Promise<object> {

    return new Promise((resolve: (response: object) => void, reject: (error: Error) => void): void => {

      const req: XMLHttpRequest = new XMLHttpRequest();

      const onLoad: (evt: Event) => void = (): void => {

        // is the response done
        if (req.readyState == XMLHttpRequest.DONE ) {

          /**
           * For our purposes if it's not a 200 range response, then it's a
           * failure.
           */
          if (req.status >= 200 && req.status < 300) {

            let response = req.response;

            if (typeof response === 'string') {

              try {

                response = JSON.parse(response);

              } catch (e) {}

            }

            resolve(response);

          } else {

            reject(new Error(`HTTP Status: ${req.status} response type: ${req.responseType}`));

          }

        }

      };

      const onError: (evt: Event) => void = (): void => {

        reject(new Error('error'));

      };

      const onAbort: (evt: Event) => void = (): void => {

        reject(new Error('aborted'));

      };

      const onTimeout: () => void = (): void => {

        reject(new Error('Timeout ' + timeout + 'ms ' + url));

      };

      req.withCredentials = sendCookies;

      req.addEventListener('load', onLoad);
      req.addEventListener('error', onError);
      req.addEventListener('abort', onAbort);

      if (body === null) {

        req.open('GET', url, true);

      } else {

        req.open('POST', url, true);

      }

      req.responseType = 'json';

      // IE has a problem if this is before the open
      req.timeout = timeout;
      req.ontimeout = onTimeout;

      req.send(body);

    });

  }

  /**
   * @static
   * @param {string} url - full path to POST to
   * @param {object} body - JSON object to post
   * @param {boolean} sendCookies - Whether or not to send the XMLHttpRequest with credentials or not
   * @param {number} [timeout] - optional timeout in milliseconds
   * @return {Promise<object>} - if the server responds the response will be returned here
   */
  public static post(url: string, body: object, sendCookies = false, timeout = 0): Promise<object> {

    return this.absCall(url, JSON.stringify(body), sendCookies, timeout);

  }

  /**
   * @static
   * @param {string} url - full path to the json
   * @param {boolean} sendCookies - Whether or not to send the XMLHttpRequest with credentials or not
   * @param {number} [timeout] - optional timeout in milliseconds
   * @return {Promise<object>} - resolves with parsed JSON
   */
  public static fetch(url: string, sendCookies = false, timeout = 0): Promise<object> {

    return this.absCall(url, null, sendCookies, timeout);

  }

}
