class Vector<T> {

  private map: Map<number, T> = new Map();
  private maxId: number = 0;

  public set(id: number, value: T): void {

    this.map.set(id, value);

    this.maxId = Math.max(this.maxId, id);

  }

  public get(id: number): T | undefined {

    return this.map.get(id);

  }

  public has(id: number): boolean {

    return this.map.has(id);

  }

  public keys(): Iterator<number> {

    return this.map.keys();

  }

  public values(): Iterator<T> {

    return this.map.values();

  }

  public isEmpty(): boolean {

    return (this.map.size === 0);

  }

}
export {Vector};
