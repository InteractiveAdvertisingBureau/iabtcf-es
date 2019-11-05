import {CmpApi} from '../lib/index.js';

describe('CmpApi', () => {

  const numbers = [1, 2, 3, 4, 5];
  const cmpApi = new CmpApi();

  // more primitive types
  describe('Array Tests', () => {

    context('With array of numbers:', function() {

      it('should be an array', function() {

        chai.assert.isArray(numbers, 'is array of numbers');

      });

      it('should contain two numbers', function() {

        chai.assert.include(numbers, 2, 'array contains a 2');

      });

      it('should contain 5 elements', function() {

        chai.assert.lengthOf(numbers, 5, 'array contains 5 elements');

      });

    });

  });

});
