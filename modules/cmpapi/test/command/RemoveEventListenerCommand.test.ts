import {AddEventListenerCommand} from '../../src/command/AddEventListenerCommand';
import {RemoveEventListenerCommand} from '../../src/command/RemoveEventListenerCommand';
import {TCDataCallback} from '../../src/callback';
import {CmpApiModel} from '../../src/CmpApiModel';
import {TCData} from '../../src/response';
import {TCStringFactory} from '@iabtcf/testing';
import {expect} from 'chai';

describe('command->RemoveEventListenerCommand', (): void => {

  it('should remove a queued TCDataCallback', (done: () => void): void => {

    CmpApiModel.tcString = TCStringFactory.base();
    debugger;

    const tcDataCallback: TCDataCallback = function(tcData: TCData): void {

      expect(tcData.listenerId, 'listenerId').to.equal(1);

      const listenerId = tcData.listenerId;

      // is queued
      expect(CmpApiModel.eventQueue.size, 'CmpApiModel.eventQueue.size after AddEventListenerCommand').to.equal(1);

      new RemoveEventListenerCommand((success: boolean): void => {

        expect(success, 'success').to.be.true;
        // is dequeued
        expect(CmpApiModel.eventQueue.size, 'CmpApiModel.eventQueue.size after RemoveEventListenerCommand').to.equal(0);
        done();

      }, listenerId);

    };

    new AddEventListenerCommand(tcDataCallback);

  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const runFailWithParam = (badParam?: any): void => {

    it(`should return result=null and success=false for param=${badParam}`, (done: () => void): void => {

      const tcDataCallback: TCDataCallback = function(): void {

        // is queued
        expect(CmpApiModel.eventQueue.size, 'CmpApiModel.eventQueue.size after AddEventListenerCommand').to.equal(1);

        new RemoveEventListenerCommand((success: boolean): void => {

          expect(success).to.be.false;
          expect(CmpApiModel.eventQueue.size, 'CmpApiModel.eventQueue.size after RemoveEventListenerCommand').to.equal(1);

          done();

        }, badParam);

      };

      CmpApiModel.tcString = TCStringFactory.base();

      new AddEventListenerCommand(tcDataCallback);

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
