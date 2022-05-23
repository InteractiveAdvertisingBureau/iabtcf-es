import {
  IntEncoder,
} from './IntEncoder.js';
import {
  DecodingError,
} from '../../errors/index.js';

export class DateEncoder {

  public static encode(value: Date, numBits: number): string {

    return IntEncoder.encode(Math.round(value.getTime()/100), numBits);

  }

  public static decode(value: string, numBits: number): Date {

    if (numBits !== value.length) {

      throw new DecodingError('invalid bit length');

    }

    const date: Date = new Date();

    date.setTime(IntEncoder.decode(value, numBits) * 100);

    return date;

  }

}
