import {Ping} from '../Ping';
import {Builder} from './Builder';
import {BuilderBase} from './BuilderBase';

export class PingBuilder implements Builder {

  protected builderBase: BuilderBase;

  public constructor(builderBase: BuilderBase) {

    this.builderBase = builderBase;

  }

  public build(): Ping {

    const ping = new Ping();
    ping.cmpStatus = this.builderBase.cmpStatus;
    return ping;

  }

  public isBuildable(): boolean {

    return this.builderBase.cmpLoaded;

  }

}
