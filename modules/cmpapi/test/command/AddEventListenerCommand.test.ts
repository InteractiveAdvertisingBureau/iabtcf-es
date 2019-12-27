import {AddEventListenerCommand} from '../../src/command/AddEventListenerCommand';
import {EventListenerQueue} from '../../src/EventListenerQueue';
import {TCDataCallback} from '../../src/types/TCDataCallback';
import {CmpApiModel} from '../../src/CmpApiModel';
import {TCModelFactory} from '@iabtcf/testing';
import {TCData} from '../../src/response/TCData';
import {expect} from 'chai';

describe('command->AddEventListenerCommand', (): void => {

  it('should not return a TCData object when called unless the state changes', (done: () => void): void => {

    let callsMade = 0;

    EventListenerQueue.clear();
    CmpApiModel.reset();
    CmpApiModel.tcModel = TCModelFactory.noGVL();

    const tcDataCallback: TCDataCallback = function(tcData: TCData): void {

      // only set after call is queued
      expect(callsMade, 'callsMade').to.equal(1);
      expect(tcData instanceof TCData).to.be.true;

      done();

    };

    new AddEventListenerCommand(tcDataCallback);

    // is queued
    expect(EventListenerQueue.size, 'EventListenerQueue.size').to.equal(1);
    callsMade = 1;

    CmpApiModel.tcModel = TCModelFactory.noGVL();

    EventListenerQueue.clear();
    done();

  });

});
