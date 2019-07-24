import {

  CoreTCEncoder,
  VendorsAllowedEncoder,
  VendorsDisclosedEncoder,
  PublisherTCEncoder,

} from '.';

export class SegmentEncoderMap {

  public readonly core: typeof CoreTCEncoder = CoreTCEncoder
  public readonly vendorsDisclosed: typeof VendorsDisclosedEncoder = VendorsDisclosedEncoder;
  public readonly vendorsAllowed: typeof VendorsAllowedEncoder = VendorsAllowedEncoder ;
  public readonly publisherTC: typeof PublisherTCEncoder = PublisherTCEncoder;

}
