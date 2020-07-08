import {TCData} from '../response';

export type TCDataCallback = (tcData: TCData, success: true, next?: Function) => void;
