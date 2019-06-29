export class Base64Url {

  private static DICT: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  private static BASIS: number = 6;
  private static REVERSE_DICT: object = {
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

  public static encode(str: string): string {

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

  public static decode(str: string): string {

    if (!this.isValid(str)) {

      throw new Error('Invalid Base64 Encoding');

    }

    const len: number = str.length;
    let bitString = '';

    for (let i = 0; i < len; i ++) {

      // index the binary value of the character from out reverse map
      const strBits = this.REVERSE_DICT[str[i]].toString(2);

      /**
       * Since a bit string converted to an integer on encoding will lose
       * leading zeros and all encoded characters must fit into a six bit
       * bucket we will pad to the left for all characters
       */
      const pad = '0'.repeat(this.BASIS - strBits.length);

      bitString += pad + strBits;

    }


    return bitString;

  }

  public static isValid(str: string): boolean {

    return /^[A-Za-z0-9\-_]+$/.test(str);

  }

  /**
   * pad - because base-n encoding requires that bits occupy Log2(n) sized
   * buckets, padding to the right will happen to the original string.
   *
   * @static
   * @param {string} str - input bit string
   * @return {string} - string padded to the base64Url encoded correct length
   */
  public static pad(str: string): string {

    return str + '0'.repeat(this.BASIS-(str.length % this.BASIS));

  }

}
