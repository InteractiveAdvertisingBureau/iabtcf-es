import {

  CoreTCStringEncoder,
  VendorsDisclosedEncoder,

} from '.';

export class SegmentEncoderMap {

  public readonly core: typeof CoreTCStringEncoder = CoreTCStringEncoder;
  public readonly oobVendorsDisclosed: typeof VendorsDisclosedEncoder = VendorsDisclosedEncoder;
  public readonly oobWhitelist: typeof CoreTCStringEncoder = CoreTCStringEncoder;
  public readonly publisherTC: typeof CoreTCStringEncoder = CoreTCStringEncoder;

}
