import {

  BitLength,
  Base64Url,
  Encoder,
  EncoderMap,
  IntEncoder,
  SegmentType,

} from '.';
import {
  EncodingError,
  DecodingError,
} from '../errors';

import {

  TCModel,
  TCModelPropType,

} from '..';

import {Vector, Fields} from '../model';

export class OOBVendorsEncoder implements Encoder<TCModel> {

  private encMap: EncoderMap = new EncoderMap();
  private base64Url: Base64Url = new Base64Url();

  private isValidType(type: string): boolean {

    return (type === Fields.vendorsAllowed || type === Fields.vendorsDisclosed);

  }

  public encode(tcModel: TCModel, type: string ): string {

    if (!this.isValidType(type)) {

      throw new EncodingError(`invalid type: ${type}`);

    }

    const intEnc: IntEncoder = new IntEncoder();
    const encoder: Encoder<TCModelPropType> = new this.encMap[type]() as Encoder<TCModelPropType>;

    // first encode the segment type
    let bits: string = intEnc.encode(SegmentType[type], BitLength.segmentType);

    // add the vector bits
    bits += encoder.encode(tcModel[type]);

    return this.base64Url.encode(bits);

  }

  public decode(encodedString: string, tcModel: TCModel, type: string): TCModel {

    if (!this.isValidType(type)) {

      throw new DecodingError(`invalid type: ${type}`);

    }

    let bits: string = this.base64Url.decode(encodedString);

    // the first n bits are the type we don't actually care about them
    bits = bits.substr(BitLength.segmentType);
    const encoder: Encoder<TCModelPropType> = new this.encMap[type]() as Encoder<TCModelPropType>;
    const vector: Vector = encoder.decode(bits) as Vector;

    vector.forEach((isSet: boolean, vendorId: number): void => {

      if (isSet) {

        tcModel[type].set(vendorId);

      }

    });

    return tcModel;

  }

}
