import {Fields} from './Fields';
import {IntMap} from './IntMap';
import {KeyMap} from './KeyMap';

export class Segments {

  public static readonly core: string = 'core';
  public static readonly vendorsDisclosed: string = Fields.vendorsDisclosed;
  public static readonly vendorsAllowed: string = Fields.vendorsAllowed;
  public static readonly publisherTC: string = 'publisherTC';

  /**
   * 0 = default - reserved for core string (does not need to be present in the core string)
   * 1 = OOB vendors disclosed
   * 2 = OOB vendors allowed
   * 3 = PublisherTC
   */
  public static readonly ID_TO_KEY: IntMap<string> = {
    '0': Segments.core,
    '1': Segments.vendorsDisclosed,
    '2': Segments.vendorsAllowed,
    '3': Segments.publisherTC,
  }
  public static readonly KEY_TO_ID: KeyMap<number> = {
    [Segments.core]: 0,
    [Segments.vendorsDisclosed]: 1,
    [Segments.vendorsAllowed]: 2,
    [Segments.publisherTC]: 3,
  }

}
