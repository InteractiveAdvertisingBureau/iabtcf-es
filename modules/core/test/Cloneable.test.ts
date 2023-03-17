// import {Cloneable} from '../src/Cloneable';
import {BinarySearchTree} from '../../core/src/model/BinarySearchTree';
import {expect} from 'chai';

describe('Cloneable', (): void => {

  it('Clone BinarySearchTree', (done: () => void): void => {

    const lastEntry = 4057;
    const values = [...Array(lastEntry).keys()].map( (i) => i + 1);
    const tree = BinarySearchTree.build(values);
    expect(tree).to.be.a('object');

    expect(tree?.clone()).to.be.a('object');
    done();

  });

});
