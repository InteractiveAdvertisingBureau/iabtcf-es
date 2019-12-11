import {Fields} from './Fields';

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
  public static readonly '0': string = Segments.core;
  public static readonly '1': string = Segments.vendorsDisclosed;
  public static readonly '2': string = Segments.vendorsAllowed;
  public static readonly '3': string = Segments.publisherTC;

}
