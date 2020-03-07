export * from './DisabledCallback';
export * from './ErrorCallback';
export * from './FailCallback';
export * from './InAppTCDataCallback';
export * from './PingCallback';
export * from './RemoveListenerCallback';
export * from './TCDataCallback';
export * from './VendorListCallback';

import {DisabledCallback} from './DisabledCallback';
import {ErrorCallback} from './ErrorCallback';
import {FailCallback} from './FailCallback';
import {InAppTCDataCallback} from './InAppTCDataCallback';
import {PingCallback} from './PingCallback';
import {RemoveListenerCallback} from './RemoveListenerCallback';
import {TCDataCallback} from './TCDataCallback';
import {VendorListCallback} from './VendorListCallback';

/**
 * Union type of all command callback function signatures
 */
export type Callback =
  DisabledCallback |
  ErrorCallback |
  FailCallback |
  InAppTCDataCallback |
  PingCallback |
  RemoveListenerCallback |
  TCDataCallback |
  VendorListCallback;
