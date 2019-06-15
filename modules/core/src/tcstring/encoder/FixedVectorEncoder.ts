import {BooleanEncoder} from './BooleanEncoder';
import {SpecificEncoder} from './SpecificEncoder';
import {Vector} from '../../model/Vector';

export class FixedVectorEncoder implements SpecificEncoder {

  public encode(vector: Vector<boolean>, numBits: number): string {

    let bitString = '';
    const boolEnc: BooleanEncoder = new BooleanEncoder();

    for (let i = 1; i <= numBits; i++) {

      bitString += boolEnc.encode(!!vector.get(i));

    }

    return bitString;

  }

}
