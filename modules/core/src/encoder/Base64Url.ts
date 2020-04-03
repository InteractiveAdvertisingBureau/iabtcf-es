import {DecodingError, EncodingError} from '../errors';

export class Base64Url {

  private static readonly BYTE: number = 8;

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

      throw new EncodingError('Invalid bitField');

    }

    const len: number = str.length;
    let retr = '';

    for (let i = 0; i < len; i += Base64Url.BYTE) {

      // grab our chunk
      let chunk: string = str.substr(i, Base64Url.BYTE);

      if (chunk.length < Base64Url.BYTE) {

        /**
         * on the very last bucket we could have something less than a byte and
         * we'll need to pad to the right to preserve the bit positions on decode
         * pad right the difference between what we have and what we need
         */

        chunk = chunk + '0'.repeat(Base64Url.BYTE - chunk.length);

      }

      /**
       * Create a char from our Byte and get push it to our return
       */
      retr += String.fromCharCode(parseInt(chunk, 2));

    }

    if (typeof btoa === 'function') {

      retr = btoa(retr);

    } else {

      retr = Buffer.from(retr, 'base64').toString();

    }

    // remove trailing '=' for url-safeness
    while (retr.charAt(retr.length - 1) === '=') {

      retr = retr.slice(0, -1);

    }

    // make it url safe by replacing slashes with underscores
    retr = retr.replace(/\//g, '_');
    // make it url safe by replacing pluses with dashes (or minuses)
    retr = retr.replace(/\+/g, '-');

    return retr;

  }

  /**
   * decodes a base64url encoded bitfield string
   *
   * @static
   * @param {string} str - base64url encoded bitfield string to be decoded
   * @return {string} - bitfield string
   */
  public static decode(str: string): string {

    const decodingError = new DecodingError('Invalidly encoded Base64URL string');

    /**
     * should contain only characters from the base64url set
     */
    if (!/^[A-Za-z0-9\-_]+$/.test(str)) {

      throw decodingError;

    }

    /**
     * Replace url safe characters with url unsafe, but base64 correct encoding
     */
    str = str.replace(/_/g, '/');
    str = str.replace(/-/g, '\+');

    /**
     * we need at least two characters to be able to decode a Base64 string
     */
    if (str.length < 2) {

      str += 'A'.repeat(2 - str.length);

    }

    /**
     * Add back the padding characters if necessary
     */
    switch (str.length % 4) {

      case 0:// No pad chars in this case
        break;
      case 2: // Two pad chars
        str += '==';
        break;
      case 3: // One pad char
        str += '=';
        break;
      default:
        throw decodingError;

    }

    if (typeof atob === 'function') {

      str = atob(str);

    } else {

      str = Buffer.from(str, 'base64').toString('binary');

    }

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
      const pad = '0'.repeat(Base64Url.BYTE - strBits.length);

      bitField += pad + strBits;

    }

    return bitField;

  }

}
