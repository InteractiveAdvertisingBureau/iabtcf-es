import {assert} from 'chai';
import {Callback} from '../../../src/command/callback/Callback';
import {TCData} from '../../../src/model';

export function run(): void {

  describe('Callback', (): void => {

    let callback: Callback;

    describe('Constructor', (): void => {

      const callbackFunction = (tcData: TCData | null, success: boolean) => {
      };

      it('should create a new instance of a CallBack', (): void => {

        callback = new Callback(callbackFunction);
        assert.isNotNull(true, 'success was false');
        assert.equal(callback.function, callbackFunction, 'Passed in callbackFunction does not match returned value');

      });

    });

    describe('isValid', (): void => {

      it('should return true if the callback function is invalid', (): void => {

        callback = new Callback((tcData: TCData | null, success: boolean): void => {});

        assert.isTrue(callback.isValid, `Did not return true if the callback function is valid`);

      });

      it('should return false if the callback function is not valid', (): void => {

        // @ts-ignore
        callback = new Callback(0);

        assert.isFalse(callback.isValid, `Did not return false if the callback function is not valid`);

      });

    });

    describe('fail', (): void => {

      it('should evoke callback with failing parameters', (done): void => {

        callback = new Callback((tcData: TCData | null, success: boolean): void => {

          assert.isFalse(success, 'callback success status was not false');

          done();

        });

        callback.fail(`this is a fail message`);

      });

    });

  });

}
