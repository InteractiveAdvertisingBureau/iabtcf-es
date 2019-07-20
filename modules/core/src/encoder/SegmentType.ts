
/**
 * 0 = default - reserved for core string (does not need to be present in the core string)
 * 1 = OOB vendor disclosed
 * 2 = OOB whitelist
 * 3 = PublisherTC
 */
export enum SegmentType {
  CORE = 0,
  OOB_DISCLOSED = 1,
  OOB_WHITELIST = 2,
  PUBLISHER = 3,
};
