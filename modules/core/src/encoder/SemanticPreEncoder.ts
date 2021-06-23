import {EncodingError} from '../errors';
import {TCModel} from '../TCModel';
import {EncodingOptions} from './EncodingOptions';
import {Vector, RestrictionType} from '../model';
import {GVL} from '../GVL';

type ProcessorFunction = (tcModel: TCModel, gvl: GVL) => TCModel;

export class SemanticPreEncoder {

  private static processor: ProcessorFunction[] = [

    (tcModel: TCModel): TCModel => tcModel,
    (tcModel: TCModel, gvl: GVL): TCModel => {

      /**
       * in case this wasn't set previously.  This should filter out invalid
       * purpose restrictions.
       */
      tcModel.publisherRestrictions.gvl = gvl;

      /**
       * Purpose 1 is never allowed to be true for legitimate interest
       */
      tcModel.purposeLegitimateInterests.unset(1);

      /**
       * If a Vendor does not declare a purpose for consent or legitimate
       * interest they should not have a positive signal for it. This code
       * removes positive signals created mistakingly.
       */
      const vectorToIntMap = new Map<string, Vector>();

      vectorToIntMap.set('legIntPurposes', tcModel.vendorLegitimateInterests);
      vectorToIntMap.set('purposes', tcModel.vendorConsents);

      vectorToIntMap.forEach((vector, gvlVendorKey) => {

        vector.forEach((value: boolean, vendorId: number): void => {

          if (value) {

            const vendor = gvl.vendors[vendorId];

            if (!vendor || vendor.deletedDate) {

              /**
               * If the vendor doesn't exist, then they should not receive a
               * positive signal
               */

              vector.unset(vendorId);

            } else if (vendor[gvlVendorKey].length === 0) {

              // Define if the current vendor is special purposes only
              const isSpecialPurposesOnly = vendor['purposes'].length === 0 && vendor['legIntPurposes'].length === 0 && vendor['specialPurposes'].length > 0;

              if (gvlVendorKey === 'legIntPurposes' && isSpecialPurposesOnly) {

                /**
                 * As special purposes have a special treatment and cannot being objected,
                 * these special purposes only vendors need to set LI signal when present
                 */

              } else {

                /**
                 * If the vendor does exist, but they haven't declared any
                 * purposes for this legal basis, then we need to see if they can
                 * possibly have the legal basis from their flexible purposes.
                 * This, of course, only matters if it is a globally-scoped string.
                 */

                if (tcModel.isServiceSpecific) {

                  if (vendor.flexiblePurposes.length === 0) {

                    /**
                     * No flexible basis for any purposes, so we can safely remove
                     * this vendor from the legal basis.
                     */
                    vector.unset(vendorId);

                  } else {

                    /**
                     * They have some flexible purposes, we should check for a
                     * publisher restriction value that would enable this vendor to
                     * have the override-preferred basis.
                     */
                    const restrictions = tcModel.publisherRestrictions.getRestrictions(vendorId);
                    let isValid = false;

                    for (let i = 0, len = restrictions.length; i < len && !isValid; i ++) {

                      /**
                       * If this condition is true the loop will break.  If we are
                       * dealing with the consent purposes ('purposes') and the
                       * publisher restriction overrides to consent then it is
                       * valid for the vendor to have a positive signal for
                       * consent.  Likewise for legitimate interest purposes
                       * ('legIntPurposes') and requiring legitimate interest.
                       */
                      isValid = (
                        (restrictions[i].restrictionType === RestrictionType.REQUIRE_CONSENT &&
                        gvlVendorKey === 'purposes') ||
                      (restrictions[i].restrictionType === RestrictionType.REQUIRE_LI &&
                        gvlVendorKey === 'legIntPurposes'));

                    }

                    if (!isValid) {

                      /**
                       * if we came through the previous  loop without finding a
                       * valid reasing: no overriding restrictions (changes in
                       * legal basis) then it's not valid for this vendor to have
                       * this legal basis.
                       */

                      vector.unset(vendorId);

                    }

                  }

                } else {

                  /**
                   * This is a globally-scoped string so flexible purposes will not
                   * be able to change this value because purposeRestrictions only
                   * apply to service-specific strings.
                   */

                  vector.unset(vendorId);

                }

              }

            }

          }

        });

      });

      tcModel.vendorsDisclosed.set(gvl.vendors);

      return tcModel;

    },
  ];

  public static process(tcModel: TCModel, options?: EncodingOptions): TCModel {

    const gvl = tcModel.gvl;

    if (!gvl) {

      throw new EncodingError('Unable to encode TCModel without a GVL');

    }

    if (!gvl.isReady) {

      throw new EncodingError('Unable to encode TCModel tcModel.gvl.readyPromise is not resolved');

    }

    tcModel = tcModel.clone();
    tcModel.consentLanguage = gvl.language.toUpperCase();

    if (options?.version > 0 && options?.version <= this.processor.length) {

      tcModel.version = options.version;

    } else {

      /**
       * this is equal to the latest or most current version
       */
      tcModel.version = this.processor.length;

    }

    const processorFunctionIndex = tcModel.version - 1;

    if (!this.processor[processorFunctionIndex]) {

      throw new EncodingError(`Invalid version: ${tcModel.version}`);

    }

    return this.processor[processorFunctionIndex](tcModel, gvl);

  }

}
