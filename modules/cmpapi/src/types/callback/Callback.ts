import {IATCDataCallback} from './IATCDataCallback';
import {PingCallback} from './PingCallback';
import {TCDataCallback} from './TCDataCallback';

export type Callback = TCDataCallback | IATCDataCallback | PingCallback;
