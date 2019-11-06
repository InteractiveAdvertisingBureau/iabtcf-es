export class Base64Url {

  private static readonly ONE_BYTE: number = 8;

  /**
   * encodes an arbitrary-length bitfield string into base64url
   *
   * @static
   * @param {string} str - arbitrary-length bitfield string to be encoded to base64url
   * @return {string} - base64url encoded result
   */
  public static encode(str: string): string {

    /**
     * should only be 0 or 1
     */
    if (!/^[0-1]+$/.test(str)) {

      throw new Error('Invalid bitField');

    }

    const len: number = str.length;
    let retr = '';

    for (let i = 0; i < len; i += Base64Url.ONE_BYTE) {

      // grab our chunk
      let chunk: string = str.substr(i, Base64Url.ONE_BYTE);

      if (chunk.length < Base64Url.ONE_BYTE) {

        /**
         * on the very last bucket we could have something less than a byte and
         * we'll need to pad to the right to preserve the bit positions on decode
         * pad right the difference between what we have and what we need
         */

        chunk = chunk + '0'.repeat(Base64Url.ONE_BYTE - chunk.length);

      }

      /**
       * Create a char from our Byte and get push it to our return
       */
      retr += String.fromCharCode(parseInt(chunk, 2));

    }

    return this.toURLENcoding(btoa(retr));

  }

  /**
   * decodes a base64url encoded bitfield string
   *
   * @static
   * @param {string} str - base64url encoded bitfield string to be decoded
   * @return {string} - bitfield string
   */
  public static decode(str: string): string {

    /**
     * should contain only characters from the base64url set
     */
    if (!/^[A-Za-z0-9\-_]+$/.test(str)) {

      throw new Error('Invalid Base64url Encoding');

    }

    /**
     * Convert from base64url to base64 and then decode it
     */
    str = atob(this.fromURLEncoding(str));

    const len: number = str.length;
    let bitField = '';

    for (let i = 0; i < len; i ++) {

      // index the binary value of the character from out reverse map
      const strBits = str.charCodeAt(i).toString(2);

      /**
       * Since a bit string converted to an integer on encoding will lose
       * leading zeros and all encoded characters must fit into a six bit
       * bucket we will pad to the left for all characters
       */
      const pad = '0'.repeat(Base64Url.ONE_BYTE - strBits.length);

      bitField += pad + strBits;

    }

    return bitField;

  }

  private static fromURLEncoding(str: string): string {

    str = str.replace(/_/g, '/');
    str = str.replace(/-/g, '\+');

    /**
     * Add back the padding characters if necessary
     */
    while (str.length % 4 !== 0) {

      str += '=';

    }

    return str;

  }

  private static toURLENcoding(str: string): string {

    // remove trailing '=' for url-safeness
    while (str.charAt(str.length - 1) === '=') {

      str = str.slice(0, -1);

    }

    // make it url safe by replacing slashes with underscores
    str = str.replace(/\//g, '_');
    // make it url safe by replacing pluses with dashes (or minuses)
    str = str.replace(/\+/g, '-');

    return str;

  }

}
