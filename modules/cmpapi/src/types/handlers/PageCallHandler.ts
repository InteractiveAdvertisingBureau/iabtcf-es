import {CallbackFunction} from '../callbacks/CallbackFunction';
import {Param} from '../Param';

export type PageCallHandler = (command: string, version: number, callback: CallbackFunction, param?: Param) => void;
