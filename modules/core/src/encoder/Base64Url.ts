/**
 * This class exists because all base64 encoding libraries that I have seen
 * including the browser-based atob() and btoa() are for encoding 8 bit string
 * characters into base64.  Secondly, there is no url safe option.  So if we
 * were to encode the arbitrary bit string, we would first need to create a
 * byte array and then run it through the standard base64 encoder.  After that,
 * to make it url safe we would have to search through the resulting string and
 * replace the unsafe ‘+’ and ‘/‘ characters with a string.replace method which
 * is an additional overhead of O(2n) complexity.  All opensource
 * implementations I have seen follow this approach to creating url-safe base
 * 64 encoded strings.  Granted a native implementation of the btoa() would
 * leverage the native browser code, which is always faster than executing the
 * interpreted javascript layer but there are quite a few manipulations that
 * have to happen pre and post process that I think it warrants a custom
 * implementation.
 *
 * Some things to note:
 *
 * 1. Because this base64 encoder is encoding an arbitrary number of bits
 * most likely there will be some trailing zeros added to the end of the string
 * in order to pad to the full 6-bit bucket.  This then makes the encoding
 * "unstable" in that the string bitfield will not be exactly equal to the
 * inputted value when decoded.
 *
 * 2. Because we are not encoding bytes to 6 bits the standard padding
 * characters defined by
 * [RFC4648](https://tools.ietf.org/html/rfc4648#section-3.2) are omitted on
 * this implementation.  The checksum should be the solution for determining
 * string integreity.
 */

import {Encoder} from '.';
export class Base64Url implements Encoder<string> {

  /**
   * Our 64 character set.  Notable is that the last two are web safe and not
   * the traditional +/ that are used in standard base64 encoding
   */
  private DICT: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  private REVERSE_DICT: object = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7,
    'I': 8,
    'J': 9,
    'K': 10,
    'L': 11,
    'M': 12,
    'N': 13,
    'O': 14,
    'P': 15,
    'Q': 16,
    'R': 17,
    'S': 18,
    'T': 19,
    'U': 20,
    'V': 21,
    'W': 22,
    'X': 23,
    'Y': 24,
    'Z': 25,
    'a': 26,
    'b': 27,
    'c': 28,
    'd': 29,
    'e': 30,
    'f': 31,
    'g': 32,
    'h': 33,
    'i': 34,
    'j': 35,
    'k': 36,
    'l': 37,
    'm': 38,
    'n': 39,
    'o': 40,
    'p': 41,
    'q': 42,
    'r': 43,
    's': 44,
    't': 45,
    'u': 46,
    'v': 47,
    'w': 48,
    'x': 49,
    'y': 50,
    'z': 51,
    '0': 52,
    '1': 53,
    '2': 54,
    '3': 55,
    '4': 56,
    '5': 57,
    '6': 58,
    '7': 59,
    '8': 60,
    '9': 61,
    '-': 62,
    '_': 63,
  }

  /**
   * log2(64) = 6
   */
  private BASIS: number = 6;

  /**
   * encodes an arbitrary-length bitfield string into base64url
   *
   * @static
   * @param {string} str - arbitrary-length bitfield string to be encoded to base64url
   * @return {string} - base64url encoded result
   */
  public encode(str: string): string {

    /**
     * should only be 0 or 1
     */
    if (!/^[0-1]+$/.test(str)) {

      throw new Error('Invalid bitField');

    }

    /**
     * Pad the remainder of the bitField with with zeros to so that it is a
     * valid base64-able bitfield
     */
    if (str.length % this.BASIS !== 0) {

      str += '0'.repeat(this.BASIS-(str.length % this.BASIS));

    }

    const len: number = str.length;
    let retr = '';

    for (let i = 0; i < len; i += this.BASIS) {

      // grab our chunk
      let chunk: string = str.substr(i, this.BASIS);

      /**
       * on the very last bucket we could have something less than 6 bits and
       * we'll need to pad to the right to preserve the bit positions on decode
       */

      // the difference between what we have and what we need
      const pad = '0'.repeat(this.BASIS - chunk.length);

      // pad right
      chunk = chunk + pad;

      /**
       * convert our binary string value to an integer and index the array for
       * our character
       */
      retr += this.DICT[parseInt(chunk, 2)];

    }

    return retr;

  }

  /**
   * decodes a base64url encoded bitfield string
   *
   * @static
   * @param {string} str - base64url encoded bitfield string to be decoded
   * @return {string} - bitfield string
   */
  public decode(str: string): string {

    /**
     * should contain only characters from the base64url set
     */
    if (!/^[A-Za-z0-9\-_]+$/.test(str)) {

      throw new Error('Invalid Base64url Encoding');

    }

    const len: number = str.length;
    let bitField = '';

    for (let i = 0; i < len; i ++) {

      // index the binary value of the character from out reverse map
      const strBits = this.REVERSE_DICT[str[i]].toString(2);

      /**
       * Since a bit string converted to an integer on encoding will lose
       * leading zeros and all encoded characters must fit into a six bit
       * bucket we will pad to the left for all characters
       */
      const pad = '0'.repeat(this.BASIS - strBits.length);

      bitField += pad + strBits;

    }

    return bitField;

  }

}
