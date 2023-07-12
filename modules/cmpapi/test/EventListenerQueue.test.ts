import {EventListenerQueue} from '../src/EventListenerQueue';
import {expect} from 'chai';
import {TCStringFactory} from '@iabtechlabtcf/testing';
import {TCString} from '@iabtechlabtcf/core';
import {TCData} from '../src/response/TCData';
import {CmpApiModel} from '../src/CmpApiModel';

describe('EventListenerQueue', (): void => {

  it('should add and remove a listener when add() and remove() are called respectively', (done: () => void): void => {

    const elq = new EventListenerQueue();

    expect(elq.size, 'size - initial').to.equal(0);

    elq.add({callback: (tcData: TCData): void => {

      expect(tcData.listenerId, 'listenerId').to.equal(0);
      elq.remove(tcData.listenerId);
      expect(elq.size, 'size - after remove').to.equal(0);
      done();

    }});

    CmpApiModel.gdprApplies = true;
    CmpApiModel.tcString = TCStringFactory.base();
    CmpApiModel.tcModel = TCString.decode(CmpApiModel.tcString);

    expect(elq.size, 'size - after add').to.equal(1);

    elq.exec();

  });

  it('should clear all listeners when clear() is called', (): void => {

    const numListeners = 10;
    const elq = new EventListenerQueue();

    expect(elq.size, 'size - initial').to.equal(0);

    for (let i =0; i < numListeners; i++) {

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      elq.add({callback: (): void => {}});

    }

    expect(elq.size, 'size - after add').to.equal(numListeners);

    elq.clear();

    expect(elq.size, 'size - after clear').to.equal(0);

  });

});
