import {BooleanEncoder} from './BooleanEncoder';
import {DecodingError} from '../../errors';
import {Vector} from '../../model';

export class FixedVectorEncoder {

  public static encode(value: Vector, numBits: number): string {

    let bitString = '';

    for (let i = 1; i <= numBits; i++) {

      bitString += BooleanEncoder.encode(value.has(i));

    }

    return bitString;

  }

  public static decode(value: string, numBits: number): Vector {

    if (value.length !== numBits) {

      throw new DecodingError('bitfield encoding length mismatch');

    }

    const vector: Vector = new Vector();

    for (let i = 1; i <= numBits; i ++) {

      if (BooleanEncoder.decode(value[i - 1])) {

        vector.set(i);

      }

    }

    vector.bitLength = value.length;

    return vector;

  }

}
