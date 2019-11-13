export interface Restrictions {

  [purposeId: string]: {
    [vendorId: string]: 0 | 1 | 2;
  } | string;

}
