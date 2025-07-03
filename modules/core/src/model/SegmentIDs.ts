import {KeyMap} from './KeyMap.js';
import {Segment} from './Segment.js';

export class SegmentIDs {

  /**
   * 0 = default - reserved for core string (does not need to be present in the core string)
   * 1 = OOB vendors disclosed
   * 2 = OOB vendors allowed
   * 3 = PublisherTC
   */
  public static readonly ID_TO_KEY: Segment[] = [
    Segment.CORE,
    Segment.VENDORS_DISCLOSED,
    Segment.VENDORS_ALLOWED,
    Segment.PUBLISHER_TC,
  ]

  public static readonly KEY_TO_ID: KeyMap<number> = {
    [Segment.CORE]: 0,
    [Segment.VENDORS_DISCLOSED]: 1,
    [Segment.VENDORS_ALLOWED]: 2,
    [Segment.PUBLISHER_TC]: 3,
  }

}
