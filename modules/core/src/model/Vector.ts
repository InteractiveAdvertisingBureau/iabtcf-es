import {GVL} from '../GVL';
import {VectorPath} from './enum/VectorPath';

class Vector<T> {

  private map: Map<number, T> = new Map();
  private maxId_: number = 0;
  public path: VectorPath;

  public constructor(gvl?: GVL, path?: VectorPath, initValue?: T) {

    // make sure they're all defined if not we'll just construct an empty Vector
    if (gvl && path !== undefined && initValue !== undefined) {

      let idsToInit: string[] = [];

      this.path = path;

      switch (path) {

        case VectorPath.PURPOSE:

          idsToInit = Object.keys(gvl.purposes);

          break;
        case VectorPath.VENDOR:

          idsToInit = Object.keys(gvl.vendors);

          break;
        case VectorPath.SPECIAL_FEATURE:

          idsToInit = Object.keys(gvl.specialFeatures);

          break;

      }

      idsToInit.forEach((strId: string): void => {

        this.set(parseInt(strId, 10), initValue as T);

      });

    }

  }

  public set(id: number, value: T): void {

    this.map.set(id, value);

    if (id > this.maxId_) {

      this.maxId_ = id;

    }

  }

  /**
   * @return {number} the highest id passed set on this Vector
   */
  public get maxId(): number {

    return this.maxId_;

  }

  public get(id: number): T | undefined {

    return this.map.get(id);

  }

  public has(id: number): boolean {

    return this.map.has(id);

  }

  public ids(): number[] {

    return Array.from(this.map.keys());

  }

  public values(): Iterator<T> {

    return this.map.values();

  }

  public isEmpty(): boolean {

    return (this.map.size === 0);

  }

}
export {Vector};
