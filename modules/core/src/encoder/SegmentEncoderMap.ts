import {

  CoreTCEncoder,
  PublisherTCEncoder,
  OOBVendorsEncoder,

} from '.';

export class SegmentEncoderMap {

  public readonly core: typeof CoreTCEncoder = CoreTCEncoder
  public readonly vendorsDisclosed: typeof OOBVendorsEncoder = OOBVendorsEncoder;
  public readonly vendorsAllowed: typeof OOBVendorsEncoder = OOBVendorsEncoder;
  public readonly publisherTC: typeof PublisherTCEncoder = PublisherTCEncoder;

}
