import {

  Encoder,
  EncoderMap,
  Base64Url,

} from '.';

import {

  TCModel,
  TCModelPropType,

} from '..';

import {Vector} from '../model';

export class VendorsDisclosedEncoder implements Encoder<TCModel> {

  private encMap: EncoderMap = new EncoderMap();
  private base64Url: Base64Url = new Base64Url();

  public encode(tcModel: TCModel): string {

    const encoder: Encoder<TCModelPropType> = new this.encMap.vendorsDisclosed() as Encoder<TCModelPropType>;
    const bits: string = encoder.encode(tcModel.vendorsDisclosed);

    return this.base64Url.encode(bits);

  }

  public decode(encodedString: string, tcModel: TCModel): TCModel {

    const bits: string = this.base64Url.decode(encodedString);
    const encoder: Encoder<TCModelPropType> = new this.encMap.vendorsDisclosed() as Encoder<TCModelPropType>;
    const vector: Vector = encoder.decode(bits) as Vector;

    vector.forEach((isSet: boolean, vendorId: number): void => {

      if (isSet) {

        tcModel.vendorsDisclosed.set(vendorId);

      }

    });

    return tcModel;

  }

}
