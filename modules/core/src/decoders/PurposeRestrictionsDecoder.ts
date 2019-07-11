import {SpecificDecoder} from './SpecificDecoder';
import {PurposeRestrictionVector} from '../model/structures/PurposeRestrictionVector';

export class PurposeRestrictionsDecoder implements SpecificDecoder {

  public decode(value: string): PurposeRestrictionVector {

    const vector: PurposeRestrictionVector = new PurposeRestrictionVector();

    return vector;

  }

}
