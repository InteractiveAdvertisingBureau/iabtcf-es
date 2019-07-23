import {Encoder} from '.';

export class BooleanEncoder implements Encoder<boolean> {

  public encode(value: boolean): string {

    return +value + '';

  }

  public decode(value: string): boolean {

    // less operations than !!parseInt(value, 2)
    return value === '1';

  }

}
