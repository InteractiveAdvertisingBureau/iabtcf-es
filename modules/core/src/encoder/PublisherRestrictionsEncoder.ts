import {SpecificEncoder} from './SpecificEncoder';
import {BitLength} from '../BitLength';
import {Vector} from '../Vector';
import {VendorVectorEncoder} from './VendorVectorEncoder';
import {PurposeRestriction} from '../PurposeRestriction';

export class PublisherRestrictionsEncoder extends VendorVectorEncoder implements SpecificEncoder {

  private vector: Vector<PurposeRestriction>;

  public encode(vector: Vector<PurposeRestriction>): string {

    this.vector = vector;

    return super.encode(vector);

  }

  protected buildRangeEncoding(): string {

    const numEntries = this.ranges.length;

    // Number of entries
    let rangeString = this.intEncoder.encode(numEntries, BitLength.rangeEncodingNumEntries);


    this.ranges.forEach((range: number[]): void => {

      const single = (range.length === 1);
      let thisRange = '';

      // first is the indicator of whether this is a single id or range (two)
      thisRange += this.boolEnc.encode(single);

      // second is the first (or only) vendorId
      thisRange += this.intEncoder.encode(range[0], BitLength.vendorId);

      if (!single) {

        thisRange += this.intEncoder.encode(range[1], BitLength.vendorId);

      }

      const pr: PurposeRestriction = this.vector.get(range[0]) as PurposeRestriction;

      thisRange += this.intEncoder.encode(pr.purposeId, BitLength.purposeRestrictionId);
      thisRange += this.intEncoder.encode(pr.restrictionType, BitLength.purposeRestrictionType);

      if (pr.isValid()) {

        rangeString += thisRange;

      }

    });

    return rangeString;

  }

  protected get useRange(): boolean {

    return true;

  }

}
