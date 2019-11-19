import {Callback} from '../callbacks/Callback';
import {Param} from '../Param';

export type PageCallHandler = (command: string, version: number, callback: Callback, param?: Param) => void;
