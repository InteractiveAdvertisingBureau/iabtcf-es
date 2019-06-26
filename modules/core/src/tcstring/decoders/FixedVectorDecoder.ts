import {BooleanDecoder} from './BooleanDecoder';
import {SpecificDecoder} from './SpecificDecoder';
import {Vector} from '../../model/Vector';

export class FixedVectorDecoder implements SpecificDecoder {

  public decode(value: string): Vector {

    const vector: Vector = new Vector();
    const boolDecoder: BooleanDecoder = new BooleanDecoder();

    for (let i = 1; i <= value.length; i ++) {

      if (boolDecoder.decode(value[i - 1])) {

        vector.set(i);

      }

    }

    return vector;

  }

}
