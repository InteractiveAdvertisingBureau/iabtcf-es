import {IATCDataCallback} from './IATCDataCallback';
import {PingCallback} from './PingCallback';
import {RemoveListenerCallback} from './RemoveListenerCallback';
import {TCDataCallback} from './TCDataCallback';
import {VendorListCallback} from './VendorListCallback';
import {ErrorCallback} from './ErrorCallback';
import {FailCallback} from './FailCallback';

/**
 * Union type of all command callback function signatures
 */
export type Callback =
  TCDataCallback |
  IATCDataCallback |
  PingCallback |
  VendorListCallback |
  RemoveListenerCallback |
  ErrorCallback |
  FailCallback;
