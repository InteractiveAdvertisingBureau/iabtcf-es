import {AddEventListenerCommand} from '../../src/command/AddEventListenerCommand';
import {CmpApiModel} from '../../src/CmpApiModel';
import {TCModelFactory} from '@cookiehub/iabtcf-testing';
import {TCData} from '../../src/response/TCData';
import {expect} from 'chai';

describe('command->AddEventListenerCommand', (): void => {

  it('should immediately return a TCData object when called and queue a call as well', (done: () => void): void => {

    CmpApiModel.tcModel = TCModelFactory.noGVL();

    const tcDataCallback = function(tcData: TCData): void {

      // only set after call is queued
      expect(tcData instanceof TCData).to.be.true;

      done();

    };

    new AddEventListenerCommand(tcDataCallback);

    // is queued
    expect(CmpApiModel.eventQueue.size, 'CmpApiModel.eventQueue.size').to.equal(1);

  });

});
