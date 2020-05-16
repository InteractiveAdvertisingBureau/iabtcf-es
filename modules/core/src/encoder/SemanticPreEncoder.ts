import {EncodingError} from '../errors';
import {TCModel} from '../TCModel';
import {EncodingOptions} from './EncodingOptions';
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

      tcModel.vendorLegitimateInterests.forEach((value: boolean, id: number) => {

        const vendor = gvl.vendors[id.toString()];

        if (!vendor || (value && vendor.legIntPurposes.length === 0 && vendor.specialPurposes.length === 0)) {

          /**
           * If a Vendor does not declare any legitimate interest purposes or special
           * purposes, then we should not set their legitimate interest establishment
           * bit. So unset it, because it should be impossible.
           */

          tcModel.vendorLegitimateInterests.unset(id);

        }

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

      tcModel.version = this.processor.length;

    }

    const processorFunctionIndex = tcModel.version - 1;

    if (!this.processor[processorFunctionIndex]) {

      throw new EncodingError(`Invalid version: ${tcModel.version}`);

    }

    return this.processor[processorFunctionIndex](tcModel, gvl);

  }

}
