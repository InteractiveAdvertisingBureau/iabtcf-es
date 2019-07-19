import {

  Encoder,
  CoreTCStringEncoder,

} from './';
import {TCModel} from '../TCModel';

export class SegmentEncoderMap {

  public static readonly core: { new(): Encoder<TCModel> } = CoreTCStringEncoder;

}
