import {

  SegmentType,

} from '.';

import {

  BitLength,
  Base64Url,

} from '../';

import {

  FieldEncoderMap,
  IntEncoder,

} from '../field';

import {

  EncodingError,

} from '../../errors';

import {

  TCModel,

} from '../../';

import {

  Vector,

} from '../../model';

export class OOBVendorsEncoder {

  private base64Url: Base64Url = new Base64Url();

  public static encode(tcModel: TCModel, type: string ): string {

    const encMap: FieldEncoderMap = new FieldEncoderMap();

    // if we have an encoder, we can do it!
    if (!encMap[type]) {

      throw new EncodingError(`invalid type: ${type}`);

    }

    const encoder = encMap[type];

    // first encode the segment type
    let bits: string = IntEncoder.encode(SegmentType[type], BitLength.segmentType);

    // add the vector bits
    bits += encoder.encode(tcModel[type]);

    return Base64Url.encode(bits);

  }

  public static decode(encodedString: string, tcModel: TCModel): TCModel {

    const encMap: FieldEncoderMap = new FieldEncoderMap();

    // first get this into bits
    const bits: string = Base64Url.decode(encodedString);

    /**
     * get the segType bits of the front of the bitfield decode them into a
     * number
     */
    const segType: number = (encMap.segmentType).decode(bits.substr(0, BitLength.segmentType));
    const segmentName: string = SegmentType[segType.toString()];
    const encoder = encMap[segmentName];
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
