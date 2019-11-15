import {
  IntEncoder,
} from './IntEncoder';

export class DateEncoder {

  public static encode(value: Date, numBits: number): string {

    return IntEncoder.encode(Math.round(value.getTime()/100), numBits);

  }

  public static decode(value: string): Date {

    const date: Date = new Date();

    date.setTime(IntEncoder.decode(value) * 100);

    return date;

  }

}
