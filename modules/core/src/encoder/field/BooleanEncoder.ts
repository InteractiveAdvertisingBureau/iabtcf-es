export class BooleanEncoder {

  public static encode(value: boolean): string {

    return +value + '';

  }

  public static decode(value: string): boolean {

    // less operations than !!parseInt(value, 2)
    return value === '1';

  }

}
