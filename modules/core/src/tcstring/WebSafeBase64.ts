export class WebSafeBase64 {

  // see (RFC3548)[http://www.faqs.org/rfcs/rfc3548.html]
  private static encodeReplacements: object = {
    '+': '-',
    '/': '_',
    '=': '',
  };

  private static decodeReplacements: object = {
    '-': '+',
    '_': '/',
  };

  public static encode(str: string): string {

    const strAr: string[] = btoa(str).split('');

    for (let i = 0; i < strAr.length; i++) {

      const char = strAr[i];

      if (this.encodeReplacements[char]) {

        strAr[i] = this.encodeReplacements[char];

      }

    }

    return strAr.join('');

  }

  public static decode(str: string): string {

    const strAr: string[] = str.split('');

    for (let i = 0; i < strAr.length; i++) {

      const char = strAr[i];

      if (this.decodeReplacements[char]) {

        strAr[i] = this.decodeReplacements[char];

      }

    }

    str = strAr.join('');

    // add the padding back
    str += '=='.substring(0, (3*str.length)%4);

    return str;

  }

}
