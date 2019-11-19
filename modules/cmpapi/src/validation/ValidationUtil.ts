/**
 * Validation class used to organize reusable validation methods
 */
export class ValidationUtil {

  public static isArray(obj): boolean {

    return Array.isArray(obj);

  }

  public static isGtrZeroIntegerArray(ray: number[]): boolean {

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return ValidationUtil.isArray(ray) && ray.every((elm) => ValidationUtil.isIntegerGtrZero(elm));

  }

  public static isString(obj): boolean {

    return (typeof obj === 'string' || obj instanceof String);

  }

  public static isNonEmptyString(obj): boolean {

    return ValidationUtil.isString(obj) && obj.length > 0;

  }

  public static isNumber(obj): boolean {

    return (typeof obj === 'number');

  }

  public static isInteger(obj): boolean {

    return Number.isInteger(obj);

  }

  public static isIntegerGtrZero(obj): boolean {

    return ValidationUtil.isInteger(obj) && obj > 0;

  }

  public static isIntegerGtrOne(obj): boolean {

    return ValidationUtil.isInteger(obj) && obj > 1;

  }

  public static isFunction(obj): boolean {

    return (typeof obj === 'function');

  }

}
