/**
 * 0 = default - reserved for core string (does not need to be present in the core string)
 * 1 = OOB vendors disclosed
 * 2 = OOB vendors allowed
 * 3 = PublisherTC
 */
export class SegmentType {

  public static readonly '0': string = 'core';
  public static readonly '1': string = 'vendorsDisclosed';
  public static readonly '2': string = 'vendorsAllowed';
  public static readonly '3': string = 'publisherTC';

  public static readonly core: number = 0;
  public static readonly vendorsDisclosed: number = 1;
  public static readonly vendorsAllowed: number = 2;
  public static readonly publisherTC: number = 3;

  // TODO: for now 3 until we build the other encoders
  public static readonly numTypes: number = 3;

};
