import {EventListenerQueue} from '../src/EventListenerQueue';
import {CmpApiModel} from '../src/CmpApiModel';
import {TCData} from '../src/response/TCData';
import {TCModelFactory} from '@iabtcf/testing';
import {expect} from 'chai';

describe('EventListenerQueue', (): void => {

  it('Adds callbacks', (done: () => void): void => {

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    EventListenerQueue.add((): void => {});

    expect(EventListenerQueue.size, 'EventListenerQueue.size').to.equal(1);

    done();

  });

  it('Removes callbacks', (done: () => void): void => {

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const myCallback = (): void => {};

    EventListenerQueue.add(myCallback);

    expect(EventListenerQueue.size, 'EventListenerQueue.size after add').to.equal(1);

    EventListenerQueue.remove(myCallback);

    expect(EventListenerQueue.size, 'EventListenerQueue.size after remove').to.equal(0);

    done();

  });

  it('Clears callbacks', (done: () => void): void => {

    const loops = 10;

    for (let i = 0; i < loops; i ++) {

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      EventListenerQueue.add((): void => {});

    }

    expect(EventListenerQueue.size, 'EventListenerQueue.size after add').to.equal(loops);

    EventListenerQueue.clear();

    expect(EventListenerQueue.size, 'EventListenerQueue.size after remove').to.equal(0);

    done();

  });

  it('Executes callbacks as TCDataCallbacks', (done: () => void): void => {

    const loops = 10;
    let inc = 0;

    for (let i = 0; i < loops; i ++) {

      EventListenerQueue.add((tcData: TCData, success: boolean): void => {

        expect(tcData instanceof TCData, 'tcData instanceof TCData').to.be.true;
        expect(success, 'success').to.be.true;
        inc++;

      });

    }

    expect(EventListenerQueue.size, 'EventListenerQueue.size after add').to.equal(loops);
    expect(inc, 'inc after add').to.equal(0);

    // needs to have a model in order to generate the callback response
    CmpApiModel.tcModel = TCModelFactory.withGVL();
    EventListenerQueue.executeCommands();

    expect(EventListenerQueue.size, 'EventListenerQueue.size after remove').to.equal(loops);
    expect(inc, 'inc after remove').to.equal(loops);

    EventListenerQueue.clear();

    done();

  });

});
