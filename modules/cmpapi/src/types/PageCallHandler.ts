import {Callback} from './callback/Callback';
import {Param} from './Param';

export type PageCallHandler = (command: string, version: number, callback: Callback, param?: Param) => void;
