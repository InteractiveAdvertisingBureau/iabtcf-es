interface BooleanVector {
  [id: string]: boolean;
}
export class TCData {

  public tcString: string;
  public tcfPolicyVersion: number;
  public cmpId: number
  public cmpVersion: number;

  /**
   * true - the user or Publisher is determined to be within the
   * jurisdiction of the GDPR
   * false - the user or Publisher is determined NOT to be within the
   * jurisdiction of the GDPR
   */
  public gdprApplies: boolean;

  /*
   * see addEventListener command
   */
  public eventStatus: string;

  /*
   * true - if using a service-specific or publisher-specific TC String
   * false - if using a global TC String.
   */
  public isServiceSpecific: boolean;

  /**
   * true - CMP is using publisher-customized stack descriptions
   * false - CMP is NOT using publisher-customized stack descriptions
   */
  public useNonStandardStacks: boolean;

  /**
   * Country code of the country that determines the legislation of
   * reference.  Normally corresponds to the country code of the country
   * in which the publisher’s business entity is established.
   */
  public publisherCC: string;

  /**
   * Only exists on service-specific TC
   *
   * true - Purpose 1 not disclosed at all. CMPs use PublisherCC to
   * indicate the publisher’s country of establishment to help vVendors
   * determine whether the vendor requires Purpose 1 consent.
   *
   * false - There is no special Purpose 1 treatmentstatus. Purpose 1 was
   * disclosed normally (consent) as expected by TCF Policy.
   */
  public purposeOneTreatment: boolean;

  /**
   * Only exists on global-scope TC
   */
  public outOfBand: {
    allowedVendors: {

      /**
       * true - Vendor is allowed to use and Out-of-Band Legal Basis
       * false - Vendor is NOT allowed to use an Out-of-Band Legal Basis
       */
      '[vendor id]': boolean;
    };
    discloseVendors: {

      /**
       * true - Vendor has been disclosed to the user
       * false - Vendor has been disclosed to the user
       */
      '[vendor id]': boolean;
    };
  };
  purpose: {
    consents: {

      /**
       * true - Consent
       * false - No Consent.
       */
      '[purpose id]': boolean;
    };
    legitimateInterests: {

      /**
       * true - Legitimate Interest Established
       * false - No Legitimate Interest Established
       */
      '[purpose id]': boolean;
    };
  };
  vendor: {

    consents: {

      /**
       * true - Consent
       * false - No Consent
       */
      '[vendor id]': boolean;

    };
    legitimateInterestslegInts: {

      /**
       * true - Legitimate Interest Established
       * false - No Legitimate Interest Established
       */
      '[vendor id]': boolean;

    };
  };
  speicalFeatureOptins: {

    /**
       * true - Special Feature Opted Into
       * false - Special Feature NOT Opted Into
       */
    '[special feature id]': boolean;
  };
  publisher: {
    consents: {

      /**
       * true - Consent
       * false - No Consent
       */
      '[purpose id]': boolean;
    };
    legitimateInterestslegInts: {

      /**
       * true - Legitimate Interest Established
       * false - No Legitimate Interest Established
       */
      '[purpose id]': boolean;
    };
    customPurpose: {
      consents: {

        /**
         * true - Consent
         * false - No Consent
         */
        '[purpose id]': boolean;
      };
      legitimateInterestslegInts: {

        /**
         * true - Legitimate Interest Established
         * false - No Legitimate Interest Established
         */
        '[purpose id]': boolean;
      };
    };
    restrictions: {

      '[purpose id]': {

        /**
         * 0 - Not Allowed
         * 1 - Require Consent
         * 2 - Require Legitimate Interest
         */
        '[vendor id]': 1;
      };
    };
  }

}
