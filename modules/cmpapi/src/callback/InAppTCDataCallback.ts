import {InAppTCData} from '../response';

export type InAppTCDataCallback = (IATCData: InAppTCData, success: true, next?: Function) => void;
