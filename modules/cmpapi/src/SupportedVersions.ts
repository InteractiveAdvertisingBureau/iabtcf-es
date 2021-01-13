type ValidType = number | undefined | null | string;

export class SupportedVersions {

  private static readonly set_: Set<ValidType> = new Set([0, 2, undefined, null]);

  public static has(value: ValidType): boolean {

    if (typeof value === 'string') {

      value = +value;

    }

    return this.set_.has(value);

  }

}
