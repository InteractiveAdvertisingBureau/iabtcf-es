import {CacheBucket} from './CacheBucket.js';

export class Cache<Type> {

    private cacheBuckets: Map<string, CacheBucket<Type>>;

    constructor() {

      this.cacheBuckets = new Map<string, CacheBucket<Type>>();

    }

    public getBucket(bucketName: string): CacheBucket<Type> {

      let bucket = this.cacheBuckets.get(bucketName);

      if (!bucket) {

        bucket = new CacheBucket<Type>(bucketName);

        this.cacheBuckets.set(bucketName, bucket);

      }

      return bucket;

    }

    public clear(): void {

      this.cacheBuckets.forEach((bucket) => bucket.clear());

    }

    public numberOfBuckets(): number {

      return this.cacheBuckets.size;

    }

    public size(): number {

      let total = 0;
      this.cacheBuckets.forEach((bucket) => total += bucket.size());
      return total;

    }

}
