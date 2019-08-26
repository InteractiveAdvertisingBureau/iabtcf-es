import {Builder} from './Builder';

import {
  Ping,
} from '../Ping';

export class PingBuilder implements Builder {

  public build(): Ping {

    const ping = new Ping();

    return ping;

  }

  public isBuildable(): boolean {

    return true;

  }

}
