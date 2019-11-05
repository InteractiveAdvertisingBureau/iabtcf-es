import {BoolInt} from '../BoolInt';
import {Ping} from '../Ping';
import {CmpStatus, DisplayStatus} from '../status';
import {Builder} from './Builder';
import {PingBuilder} from './PingBuilder';

export class BuilderBase {

  public cmpId: number;
  public cmpVersion: number;
  public gdprApplies: boolean | BoolInt;
  public tcfPolicyVersion: number;

  public cmpLoaded: boolean;
  public cmpStatus: CmpStatus;
  public displayStatus: DisplayStatus;
  public apiVersion: string;
  public gvlVersion: number;

  // eslint-disable-next-line no-invalid-this
  public pingBuilder = new PingBuilder(this);

  // public PingBuilder = new class implements Builder {
  //
  //   public _superThis: BuilderBase;
  //
  //   public constructor(_superThis: BuilderBase) {
  //
  //     this._superThis = _superThis;
  //
  //   }
  //
  //   public build(): Ping {
  //
  //     const ping = new Ping();
  //     return ping;
  //
  //   }
  //
  //   public isBuildable(): boolean {
  //
  //     return this._superThis.cmpLoaded;
  //
  //   }
  //
  //   // eslint-disable-next-line
  // }(this);

}
