export class Validation {

  public static isArray(obj): boolean {

    return Array.isArray(obj);

  }

  public static isGtrZeroIntegerArray(ray: number[]): boolean {

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return Validation.isArray(ray) && ray.every((elm) => Validation.isIntegerGtrZero(elm));

  }

  public static isString(obj): boolean {

    return (typeof obj === 'string' || obj instanceof String);

  }

  public static isNumber(obj): boolean {

    return (typeof obj === 'number');

  }

  public static isInteger(obj): boolean {

    return Number.isInteger(obj);

  }

  public static isIntegerGtrZero(obj): boolean {

    return Validation.isInteger(obj) && obj > 0;

  }

  public static isIntegerGtrOne(obj): boolean {

    return Validation.isInteger(obj) && obj > 1;

  }

  public static isFunction(obj): boolean {

    return (typeof obj !== 'function');

  }

}
