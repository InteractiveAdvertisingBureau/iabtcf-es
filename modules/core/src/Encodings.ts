class Encodings {

  /**
   * key is the name of the field  and the value is the number of bits reserved
   * for the field.  These values come directly from the "IAB Tech Lab -
   * Consent string and vendor list formats v2". If the value is 0, that means
   * that is is a variable length encoding.
   */

  public static BITS: object = {
    VERSION: 6,
    CHECKSUM: 18,
    CREATED: 36,
    LAST_UPDATED: 36,
    CMPID: 12,
    CMP_VERSION: 12,
    CONSENT_SCREEN: 6,
    CONSENT_LANGUAGE: 12,
    VENDOR_LIST_VERSION: 12,
    POLICY_VERSION: 6,
    IS_SERVICE_SPECIFIC: 1,
    USE_NON_STANDARD_STACKS: 1,
    SPECIAL_FEATURE_OPTINS: 12,
    PURPOSES_CONSENT: 24,
    PURPOSES_LI_ESTABLISHED: 24,
    VENDOR_CONSENT: 0,
    VENDOR_LI: 0,
    PUBLISHER_RESTRICTIONS: 0,
  }


  /**
   * The outer array describes index is encoding version - 1 (since it's
   * zero-based) and the inner array is the string representation of the BITS
   * static above ordered by "IAB Tech Lab - Consent string and vendor list
   * formats v2"
   */

  public static ENCODING: string[][] = [

    // tcf v1
    [
      'VERSION',
      'CREATED',
      'LAST_UPDATED',
      'CMP_ID',
      'CMP_VERSION',
      'CONSENT_SCREEN',
      'CONSENT_LANGUAGE',
      'VENDOR_LIST_VERSION',
      'PURPOSES_CONSENT',
      'VENDOR_CONSENT',
    ],

    // tcf v2
    [
      'VERSION',
      'CHECKSUM',
      'CREATED',
      'LAST_UPDATED',
      'CMP_ID',
      'CMP_VERSION',
      'CONSENT_SCREEN',
      'CONSENT_LANGUAGE',
      'VENDOR_LIST_VERSION',
      'POLICY_VERSION',
      'IS_SERVICE_SPECIFIC',
      'USE_NON_STANDARD_STACKS',
      'SPECIAL_FEATURE_OPTINS',
      'PURPOSES_CONSENT',
      'PURPOSES_LI_TRANSPARENCY',
      'VENDOR_CONSENT',
      'VENDOR_LI',
      'PUBLISHER_RESTRICTIONS',
    ],
  ];

  /**
   * intWithinRange - Determines weither a given value will fit within the encoding of bits
   *
   * @static
   * @param {number} bits - Use Encodings.BITS.[FIELDNAME] which contains the number of bits to be encoded
   * @param {number} checkValue - the value to check
   * @return {boolean} - whether or not the value will fit within the encoding length
   */
  public static intWithinRange(bits: number, checkValue: number): boolean {

    const maxValue = Math.pow(2, bits);

    return (checkValue >= 0 && maxValue > checkValue );

  };


}

export {Encodings};
