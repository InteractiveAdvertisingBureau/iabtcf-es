import {

  SegmentType,

} from './';

export class SegmentSequence {

  public static readonly '1': number[] = [
    SegmentType.CORE,
  ];
  public static readonly '2': number[] = [
    SegmentType.CORE,
    SegmentType.PUBLISHER,
    SegmentType.OOB_DISCLOSED,
    SegmentType.OOB_WHITELIST,
  ];

}
