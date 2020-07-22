import {
  IntEncoder,
} from './IntEncoder';
import {
  DecodingError,
} from '../../errors';

export class DateEncoder {

  public static encode(value: Date, numBits: number): string {

    return IntEncoder.encode(Math.round(value.getTime()/100), numBits);

  }

  public static decode(value: string, numBits: number): Date {

    if (numBits !== value.length) {

      throw new DecodingError('invalid bit length');

    }

    return new Date(IntEncoder.decode(value, numBits) * 100);

  }

}
