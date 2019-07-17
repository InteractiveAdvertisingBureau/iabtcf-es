import {Encoder} from './Encoder';
import {BooleanEncoder} from './BooleanEncoder';
import {Vector} from '../model/Vector';

export class FixedVectorEncoder implements Encoder<Vector> {

  public encode(value: Vector, numBits: number): string {

    let bitString = '';
    const boolEnc: BooleanEncoder = new BooleanEncoder();

    for (let i = 1; i <= numBits; i++) {

      bitString += boolEnc.encode(value.has(i));

    }

    return bitString;

  }

  public decode(value: string): Vector {

    const vector: Vector = new Vector();
    const boolDecoder: BooleanEncoder = new BooleanEncoder();

    for (let i = 1; i <= value.length; i ++) {

      if (boolDecoder.decode(value[i - 1])) {

        vector.set(i);

      }

    }

    return vector;

  }

}
