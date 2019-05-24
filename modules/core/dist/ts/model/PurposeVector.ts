class PurposeVector {

  private map: Map<number, boolean>;

  public constructor() {

    this.map = new Map();

  }

  public setPurpose(purposeId: number, value: boolean): void {

    this.map.set(purposeId, value);

  }

  public getPurpose(purposeId: number): boolean | never {

    if (this.map && this.map.has(purposeId)) {

      return this.map.get(purposeId) || false;

    } else {

      throw new RangeError(`Purpose id ${purposeId} does not exist`);

    }

  }

}

export {PurposeVector};
