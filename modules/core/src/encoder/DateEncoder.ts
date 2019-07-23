import {
  Encoder,
  IntEncoder,
} from '.';

export class DateEncoder implements Encoder<Date> {

  public encode(value: Date, numBits: number): string {

    const intEncoder: IntEncoder = new IntEncoder();

    return intEncoder.encode(Math.round(value.getTime()/100), numBits);

  }

  public decode(value: string): Date {

    const date: Date = new Date();
    const intEncoder: IntEncoder = new IntEncoder();

    date.setTime(intEncoder.decode(value) * 100);

    return date;

  }

}
