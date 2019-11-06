import {

  BooleanEncoder,

} from '.';

import {

  Vector,

} from '../../model';

export class FixedVectorEncoder {

  public static encode(value: Vector, numBits: number): string {

    let bitString = '';

    for (let i = 1; i <= numBits; i++) {

      bitString += BooleanEncoder.encode(value.has(i));

    }

    return bitString;

  }

  public static decode(value: string): Vector {

    const vector: Vector = new Vector();

    for (let i = 1; i <= value.length; i ++) {

      if (BooleanEncoder.decode(value[i - 1])) {

        vector.set(i);

      }

    }

    return vector;

  }

}
