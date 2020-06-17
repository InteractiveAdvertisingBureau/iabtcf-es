import {AddEventListenerCommand} from '../../src/command/AddEventListenerCommand';
import {CmpApiModel} from '../../src/CmpApiModel';
import {TCModelFactory} from '@iabtcf/testing';
import {TCData} from '../../src/response/TCData';
import {expect} from 'chai';

describe('command->AddEventListenerCommand', (): void => {

  it('should immediately return a TCData object when called and again when state changes', (done: () => void): void => {

    let callsMade = 0;
    let callsReceived = 0;

    CmpApiModel.tcModel = TCModelFactory.noGVL();

    const tcDataCallback = function(tcData: TCData): void {

      callsReceived++;
      // only set after call is queued
      expect(callsMade, 'callsReceived').to.equal(callsReceived);
      expect(tcData instanceof TCData).to.be.true;

      if (callsReceived === 4) {

        done();

      }

    };

    callsMade++;
    new AddEventListenerCommand(tcDataCallback);

    // is queued
    expect(CmpApiModel.eventQueue.size, 'CmpApiModel.eventQueue.size').to.equal(1);
    callsMade++;

    CmpApiModel.tcModel = TCModelFactory.noGVL();
    expect(CmpApiModel.eventQueue.size, 'CmpApiModel.eventQueue.size').to.equal(1);
    callsMade++;

    CmpApiModel.tcModel = TCModelFactory.noGVL();
    expect(CmpApiModel.eventQueue.size, 'CmpApiModel.eventQueue.size').to.equal(1);
    callsMade++;

    done();

  });

});
