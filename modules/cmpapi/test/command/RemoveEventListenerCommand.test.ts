import {AddEventListenerCommand} from '../../src/command/AddEventListenerCommand';
import {RemoveEventListenerCommand} from '../../src/command/RemoveEventListenerCommand';
import {TCDataCallback} from '../../src/callback';
import {CmpApiModel} from '../../src/CmpApiModel';
import {TCModelFactory} from '@iabtcf/testing';
import {expect} from 'chai';

describe('command->RemoveEventListenerCommand', (): void => {

  it('should remove a queued TCDataCallback', (done: () => void): void => {

    CmpApiModel.tcModel = TCModelFactory.noGVL();

    const tcDataCallback: TCDataCallback = function(): void {

      expect.fail('Should not have been called'); ;

      done();

    };

    new AddEventListenerCommand(tcDataCallback);

    // is queued
    expect(CmpApiModel.eventQueue.size, 'CmpApiModel.eventQueue.size after AddEventListenerCommand').to.equal(1);

    new RemoveEventListenerCommand((success: boolean): void => {

      expect(success, 'success').to.be.true;
      // is dequeued
      expect(CmpApiModel.eventQueue.size, 'CmpApiModel.eventQueue.size after RemoveEventListenerCommand').to.equal(0);

    }, tcDataCallback);

    done();

  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const runFailWithParam = (badParam?: any): void => {

    it(`should return result=null and success=false for param=${badParam}`, (done: () => void): void => {

      CmpApiModel.tcModel = TCModelFactory.noGVL();

      const tcDataCallback: TCDataCallback = function(): void {

        expect.fail('Should not have been called'); ;

        done();

      };

      new AddEventListenerCommand(tcDataCallback);

      // is queued
      expect(CmpApiModel.eventQueue.size, 'CmpApiModel.eventQueue.size after AddEventListenerCommand').to.equal(1);
      new RemoveEventListenerCommand((success: boolean): void => {

        expect(success).to.be.false;
        done();

      }, badParam);

    });

  };

  runFailWithParam();
  runFailWithParam(1);
  runFailWithParam({});
  runFailWithParam([]);
  runFailWithParam([1, 3, 5]);
  runFailWithParam(null);
  runFailWithParam('banana');
  runFailWithParam((): void => {

    expect.fail('this was never registered');

  });

});
