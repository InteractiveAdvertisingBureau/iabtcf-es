
/**
 * 0 = default - reserved for core string (does not need to be present in the core string)
 * 1 = OOB vendor disclosed
 * 2 = OOB whitelist
 * 3 = PublisherTC
 */
export enum SegmentType {
  CORE = 'core',
  OOB_DISCLOSED = 'oobDisclosed',
  OOB_WHITELIST = 'oobWhitelist',
  PUBLISHER = 'publisherTC',
};
