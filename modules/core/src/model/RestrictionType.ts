/**
 * if a Vendor has declared flexible purposes (see: [[Vendor]] under
 * `flexiblePurposeIds`) on the Global Vendor List ([[Declarations]]) a CMP may
 * change their legal basis for processing in the encoding.
 */
export enum RestrictionType {

  /**
   * under no circumstances is this purpose allowed.
   */
  NOT_ALLOWED,

  /**
   * if the default declaration is legitimate interest then this flips the purpose to consent in the encoding.
   */
  REQUIRE_CONSENT,

  /**
   * if the default declaration is consent then this flips the purpose to Legitimate Interest in the encoding.
   */
  REQUIRE_LI,

}
