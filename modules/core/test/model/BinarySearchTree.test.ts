import {expect} from 'chai';
import {BinarySearchTree} from '../../src/model/BinarySearchTree';

export function run(): void {

  describe('BinarySearchTree', (): void => {

    const getOrderedArray = (len: number, startNum: number = 1): number[] => {

      const ar: number[] = [];

      // generate ordered array
      for (let i = startNum; i < startNum + len; i++) {

        ar.push(i);

      }

      return ar;

    };

    const getRandomArray = (len: number, startNum: number = 1): number[] => {

      const ar: number[] = getOrderedArray(len, startNum);

      // fisher-yates shuffle
      for (let i = len - 1; i >= 0; i--) {

        const swapWith: number = Math.round(Math.random() * i);
        const temp: number = ar[swapWith];

        ar[swapWith] = ar[i];
        ar[i] = temp;

      }

      return ar;

    };

    it('should create an empty tree on instantiation', (): void => {

      const bst = new BinarySearchTree();

      expect(bst.isEmpty()).to.be.true;

    });

    it('should get() sorted array', (): void => {

      const numItems = 40;
      const ar: number[] = getRandomArray(numItems);
      const bst = new BinarySearchTree();

      for (let i =0; i < numItems; i++) {

        bst.add(ar[i]);

      }

      const result: number[] = bst.get();

      // expect the bst get method to return a sorted
      expect(result).to.deep.equal(getOrderedArray(numItems));

    });

    it('should handle non sequential numbers', (): void => {

      const bst: BinarySearchTree = new BinarySearchTree();
      const randAr: number[] = [5, 9, 7, 2, 3];

      randAr.forEach((num: number): void => {

        bst.add(num);

      });

      const expected: number[] = randAr.sort();
      const actual: number[] = bst.get();

      expect(actual).to.deep.equal(expected);

    });

    it('should not insert duplicates', (): void => {

      const bst: BinarySearchTree = new BinarySearchTree();
      const randAr: number[] = [1, 2, 2, 3];

      randAr.forEach((num: number): void => {

        bst.add(num);

      });

      // de-dupe the array
      const arSet: Set<number> = new Set<number>(randAr);
      // convert back to array and sort it
      const expected: number[] = Array.from(arSet).sort();
      const actual: number[] = bst.get();

      expect(actual).to.deep.equal(expected);

    });

    for (let i = 0; i < 12; i++) {

      const numItems = Math.pow(2, i);
      const startNum = 1 + Math.round(Math.random() * numItems);
      const maxVal = startNum + numItems - 1;
      const ar: number[] = getRandomArray(numItems, startNum);
      const randomNum: number = ar[Math.floor(Math.random()*ar.length)];

      const makeTree = (): BinarySearchTree => {

        const bst = new BinarySearchTree();

        for (let i =0; i < numItems; i++) {

          bst.add(ar[i]);

        }

        return bst;

      };

      describe(`${numItems} item${numItems === 1 ? '' : 's'}: ${startNum} to ${maxVal}`, (): void => {

        it(`should remove ${randomNum}`, (): void => {

          const bst = makeTree();

          bst.remove(randomNum);
          expect(bst.get()).to.not.include(randomNum);

        });

        it(`should have a min value of ${startNum}`, (): void => {

          const bst = makeTree();

          expect(bst.min()).to.equal(startNum);

        });

        it(`should have a max value of ${maxVal}`, (): void => {

          const bst = makeTree();

          expect(bst.max()).to.equal(maxVal);

        });

        it(`should contain ${randomNum}`, (): void => {

          const bst = makeTree();

          expect(bst.contains(randomNum)).to.be.true;

        });

      });

    }

  });

}
