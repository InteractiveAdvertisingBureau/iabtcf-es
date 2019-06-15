import {expect} from 'chai';
import {Vector} from '../src/model/Vector';

describe('Vector', (): void => {

  it('should basically work', (): void => {

    const makeVector: () => void = (): void => {

      // disabling because it's upset that I'm not doing anything with this
      // eslint-disable-next-line
      const vector: Vector<boolean> = new Vector<boolean>();

    };

    expect(makeVector).to.not.throw();

  });

});
