import {IATCDataCallback} from './IATCDataCallback';
import {PingCallback} from './PingCallback';
import {RemoveListenerCallback} from './RemoveListenerCallback';
import {TCDataCallback} from './TCDataCallback';
import {VendorListCallback} from './VendorListCallback';

export type Callback = TCDataCallback | IATCDataCallback | PingCallback | VendorListCallback | RemoveListenerCallback;
