import {

  CoreTCStringEncoder,
  SegmentType,
  TCModelEncoder,

} from './';

export class SegmentEncoderMap {

  public static readonly '1': Map<number, TCModelEncoder> = new Map([

    [SegmentType.CORE, CoreTCStringEncoder],

  ]);

  public static readonly '2': Map<number, TCModelEncoder> = new Map([

    [SegmentType.CORE, CoreTCStringEncoder],

  ]);

}
