class PurposeVector {

  private map: Map<number, boolean>;

  public constructor() {

    this.map = new Map();

  }

  public setPurpose(purposeId: number, value: boolean): void {

    this.map.set(purposeId, value);

  }

  public getPurpose(purposeId: number): boolean {

    return this.map.get(purposeId);

  }

}

export {PurposeVector};
