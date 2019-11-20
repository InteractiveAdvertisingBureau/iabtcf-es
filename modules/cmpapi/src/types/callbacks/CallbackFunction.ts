import {IATCDataCallback} from './IATCDataCallback';
import {PingCallback} from './PingCallback';
import {RemoveListenerCallback} from './RemoveListenerCallback';
import {TCDataCallback} from './TCDataCallback';
import {VendorListCallback} from './VendorListCallback';

/**
 * Union type of all default command callback function signatures
 */
export type CallbackFunction =
  TCDataCallback | IATCDataCallback | PingCallback | VendorListCallback | RemoveListenerCallback;
