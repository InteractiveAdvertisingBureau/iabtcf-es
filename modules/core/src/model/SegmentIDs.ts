import {IntMap} from './IntMap';
import {KeyMap} from './KeyMap';
import {Segment} from './Segment';

export class SegmentIDs {

  /**
   * 0 = default - reserved for core string (does not need to be present in the core string)
   * 1 = OOB vendors disclosed
   * 2 = OOB vendors allowed
   * 3 = PublisherTC
   */
  public static readonly ID_TO_KEY: IntMap<Segment> = {
    '0': Segment.CORE,
    '1': Segment.VENDORS_DISCLOSED,
    '2': Segment.VENDORS_ALLOWED,
    '3': Segment.PUBLISHER_TC,
  }

  public static readonly KEY_TO_ID: KeyMap<number> = {
    [Segment.CORE]: 0,
    [Segment.VENDORS_DISCLOSED]: 1,
    [Segment.VENDORS_ALLOWED]: 2,
    [Segment.PUBLISHER_TC]: 3,
  }

}
