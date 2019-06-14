import {SpecificEncoder} from './SpecificEncoder';
import {Vector} from '../Vector';
import {PurposeRestriction} from '../PurposeRestriction';

class VectorEncoder implements SpecificEncoder {

  // Must implement
  public encode(value: Vector<boolean> | Vector<PurposeRestriction>): string {

    return '0';

  }

}
export {VectorEncoder};
