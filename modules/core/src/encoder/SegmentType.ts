/**
 * 0 = default - reserved for core string (does not need to be present in the core string)
 * 1 = OOB vendor disclosed
 * 2 = OOB whitelist
 * 3 = PublisherTC
 */
export class SegmentType {

  public static readonly '0': string = 'core';
  public static readonly '1': string = 'oobVendorsDisclosed';
  public static readonly '2': string = 'oobWhitelist';
  public static readonly '3': string = 'publisherTC';

  // TODO: for now 1 until we build the other encoders
  public static readonly numTypes: number = 1;

};
