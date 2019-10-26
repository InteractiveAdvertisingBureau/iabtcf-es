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
} from '../errors';

import {

  TCModel,
  TCModelPropType,

} from '..';

import {Vector} from '../model';

export class OOBVendorsEncoder implements Encoder<TCModel> {

  private encMap: EncoderMap = new EncoderMap();
  private base64Url: Base64Url = new Base64Url();

  public encode(tcModel: TCModel, type: string ): string {

    // if we have an encoder, we can do it!
    if (!this.encMap[type]) {

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

  public decode(encodedString: string, tcModel: TCModel): TCModel {

    // first get this into bits
    const bits: string = this.base64Url.decode(encodedString);

    /**
     * get the segType bits of the front of the bitfield decode them into a
     * number
     */
    const segType: number = (new this.encMap.segmentType()).decode(bits.substr(0, BitLength.segmentType));
    const segmentName: string = SegmentType[segType.toString()];
    const encoder: Encoder<TCModelPropType> = new this.encMap[segmentName]() as Encoder<TCModelPropType>;
    // less the segmentType bits
    const vector: Vector = encoder.decode(bits.substr(BitLength.segmentType)) as Vector;

    vector.forEach((isSet: boolean, vendorId: number): void => {

      if (isSet) {

        tcModel[segmentName].set(vendorId);

      }

    });

    return tcModel;

  }

}
