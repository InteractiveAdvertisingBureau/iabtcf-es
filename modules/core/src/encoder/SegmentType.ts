/**
 * 0 = default - reserved for core string (does not need to be present in the core string)
 * 1 = OOB vendors disclosed
 * 2 = OOB vendors allowed
 * 3 = PublisherTC
 */
import {Segments} from '../model';

export class SegmentType {

  public static readonly '0': string = Segments.core;
  public static readonly '1': string = Segments.vendorsDisclosed;
  public static readonly '2': string = Segments.vendorsAllowed;
  public static readonly '3': string = Segments.publisherTC;

  public static readonly core: number = 0;
  public static readonly vendorsDisclosed: number = 1;
  public static readonly vendorsAllowed: number = 2;
  public static readonly publisherTC: number = 3;

  public static readonly numTypes: number = 4;

};
