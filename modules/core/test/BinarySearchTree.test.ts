import {expect} from 'chai';
import {BinarySearchTree} from '../src/model/BinarySearchTree';

describe('BinarySearchTree', (): void => {

  const getOrderedArray = (len: number): number[] => {

    const ar: number[] = [];

    // generate ordered array
    for (let i = 1; i <= len; i++) {

      ar.push(i);

    }
    return ar;

  };

  const getRandomArray = (len: number): number[] => {

    const ar: number[] = getOrderedArray(len);

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
  it('should remove() a value', (): void => {

    const numItems = 40;
    const deleteNum = Math.round(Math.random()* numItems);
    const ar: number[] = getRandomArray(numItems);
    const bst = new BinarySearchTree();

    for (let i =0; i < numItems; i++) {

      bst.add(ar[i]);

    }
    bst.remove(deleteNum);
    const result: number[] = bst.get();

    // expect the bst get method to return a sorted
    expect(result).to.not.include(deleteNum);

  });

});
