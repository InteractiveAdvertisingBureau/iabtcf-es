import {Callback} from "../types/callback/Callback";
import {Param} from "../types/Param";

export interface Command {

  execute(callback: Callback, param?: Param): void;

}
