import {

  CoreTCStringEncoder,
  VendorsAllowedEncoder,
  VendorsDisclosedEncoder,

} from '.';

export class SegmentEncoderMap {

  public readonly core: typeof CoreTCStringEncoder = CoreTCStringEncoder;
  public readonly vendorsDisclosed: typeof VendorsDisclosedEncoder = VendorsDisclosedEncoder;
  public readonly vendorsAllowed: typeof VendorsAllowedEncoder = VendorsAllowedEncoder ;
  public readonly publisherTC: typeof CoreTCStringEncoder = CoreTCStringEncoder;

}
