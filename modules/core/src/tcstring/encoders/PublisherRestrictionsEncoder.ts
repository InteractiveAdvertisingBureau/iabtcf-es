/*
import {SpecificEncoder} from './SpecificEncoder';
import {BitLength} from '../BitLength';
import {IntEncoder} from './IntEncoder';
import {BooleanEncoder} from './BooleanEncoder';
import {Vector} from '../../model/Vector';
import {PurposeRestriction} from '../../model/PurposeRestriction';

export class PublisherRestrictionsEncoder implements SpecificEncoder {

  public encode(vector: Vector<PurposeRestriction>): string {

    const intEncoder: IntEncoder = new IntEncoder();
    const boolEnc: BooleanEncoder = new BooleanEncoder();
    const ranges: number[][] = [];
    let range: number[] = [];
    const ids = vector.ids();

    const closeRange = (): void => {

      ranges.push(range);
      range = [];

    };

    for (let i = 0; i < ids.length; i ++) {

      const curId = ids[i];
      const curValue = vector.get(curId);

      if ( i === 0) {

        range[0] = curId;

      } else {

        const prevId = ids[i-1];
        const prevValue = vector.get(prevId );

        // no gap between ids, cur and prev values and same values as previous?
        if (prevId === curId - 1
          && curValue
          && prevValue
          && prevValue.isSameAs(curValue)) {

          // put it onto the existing range in position 2
          range[1] = curId;

        } else {

          // non sequential entry

          closeRange();
          range[0] = curId;
          if (i === ids.length - 1) {

            closeRange();

          }

        }

      }

    }

    // Number of entries
    let rangeString = intEncoder.encode(ranges.length, BitLength.rangeEncodingNumEntries);

    ranges.forEach((range: number[]): void => {

      const single = (range.length === 1);

      // first is the indicator of whether is a single id or range (two)
      // 0 is single and range is 1
      rangeString += boolEnc.encode(!single);

      // second is the first (or only) vendorId
      rangeString += intEncoder.encode(range[0], BitLength.vendorId);

      if (!single) {

        rangeString += intEncoder.encode(range[1], BitLength.vendorId);

      }

      const pr: PurposeRestriction = vector.get(range[0]) as PurposeRestriction;

      rangeString += intEncoder.encode(pr.purposeId, BitLength.purposeRestrictionId);
      rangeString += intEncoder.encode(pr.restrictionType, BitLength.purposeRestrictionType);

    });

    return rangeString;

  }

}
*/
