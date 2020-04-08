export class PowerSet {

  public static generate(numValues: number): boolean[][] {

    const total = 1 << numValues;
    const powSet: boolean[][] = [];

    for (let i =0; i < total; i++) {

      const group: boolean[] = [];

      for (let j=0; j < numValues; j++) {

        group.push(!!((i >> j) & 1));

      }

      powSet.push(group);

    }

    return powSet;

  }

}
