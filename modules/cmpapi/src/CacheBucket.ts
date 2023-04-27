export class CacheBucket<Type> {

    public name: string;
    public recalculations: number;

    private cache: Map<string, Type>;

    constructor(name: string) {

      this.name = name;

      this.recalculations = 0;

      this.cache = new Map<string, Type>();

    }

    public get(key: string, recalculation: Function, ...args): Type {

      let value = this.cache.get(key);

      if (value) {

        return value;

      }

      value = recalculation(...args);

      this.cache.set(key, value);
      this.recalculations++;

      return value;

    }

    public clear(): void {

      this.cache.clear();
      this.recalculations = 0;

    }

    public size(): number {

      return this.cache.size;

    }

}
