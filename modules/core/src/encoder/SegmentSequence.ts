import {

  SegmentType,
  VersionMap,

} from '.';

export class SegmentSequence implements VersionMap {

  public readonly '1': string[] = [
    SegmentType.CORE,
  ];
  public readonly '2': string[] = [
    SegmentType.CORE,
    /*
    SegmentType.PUBLISHER,
    SegmentType.OOB_DISCLOSED,
    SegmentType.OOB_WHITELIST,
    */
  ];

}
