export class PolyFill {

  public constructor() {

    Number.isInteger = Number.isInteger || function(value: unknown): boolean {

      return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;

    };

  }

}
