import {

  SegmentType,

} from '.';

export class SegmentSequence {

  public static readonly '1': string[] = [
    SegmentType.CORE,
  ];
  public static readonly '2': string[] = [
    SegmentType.CORE,
    SegmentType.PUBLISHER,
    SegmentType.OOB_DISCLOSED,
    SegmentType.OOB_WHITELIST,
  ];

}
