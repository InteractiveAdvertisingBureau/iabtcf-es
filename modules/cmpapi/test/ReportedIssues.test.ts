import * as stub from '@iabtcf/stub';
import {CmpApiModel} from '../src/CmpApiModel';
import {CmpApi} from '../src/';
import {Disabled, Response, TCData} from '../src/response';
import {expect} from 'chai';
import {makeRandomInt, TCStringFactory} from '@iabtcf/testing';
import {EventStatus} from '../src/status/EventStatus';
import {TCFCommands} from '../src/command/TCFCommands';

const API_FUNCTION_NAME = '__tcfapi';

describe('Reported github issues', (): void => {

  const removeStub = (): void =>{

    // clean up that junk
    if (typeof window[API_FUNCTION_NAME] === 'function') {

      delete window[API_FUNCTION_NAME];

    }

    const iframes = document.querySelectorAll('iframe');

    for (let i = 0; i < iframes.length; i++) {

      const frame: HTMLElement = iframes[i];

      if (frame !== null && frame.parentNode) {

        frame.parentNode.removeChild(frame);

      }

    }

  };

  beforeEach((): void => {

    stub.default();

  });
  afterEach((): void => {

    removeStub();

  });

  it('Issue 96 CmpApi should respond to addEventListener call with an error object when in an Error state', (done: () => void): void => {

    const cmpApi = new CmpApi(makeRandomInt(2, Math.pow(2, 6)), makeRandomInt(2, Math.pow(2, 6)));

    cmpApi.disable();

    window[API_FUNCTION_NAME]('addEventListener', 2, (response: Response): void => {

      expect(response instanceof Disabled, 'response instanceof Disabled').to.be.true;

      done();

    });

  });

  it('Should not throw an error if getTCData is called before update is called', (done: () => void): void => {

    const cmpApi = new CmpApi(makeRandomInt(2, Math.pow(2, 6)), makeRandomInt(2, Math.pow(2, 6)));

    const callDatFunc = (): void => {

      window[API_FUNCTION_NAME](TCFCommands.GET_TC_DATA, 2, (response: Response): void => {

        expect(response instanceof TCData, 'response instanceof TCData').to.be.true;

        done();

      });

    };

    expect(callDatFunc, 'call getTCData').not.to.throw();

    cmpApi.update(TCStringFactory.base());

  });

  it('126 Should not throw an error tc string is set as ""', (done: () => void): void => {

    const cmpId = makeRandomInt(2, Math.pow(2, 6));
    const cmpVersion = makeRandomInt(2, Math.pow(2, 6));
    const cmpApi = new CmpApi(cmpId, cmpVersion);
    const emptyString = '';

    expect((): void => {

      cmpApi.update(emptyString);

    }).not.to.throw();

    expect(CmpApiModel.tcModel, 'tcModel').not.to.be.undefined;
    expect(CmpApiModel.tcModel, 'tcModel').not.to.be.null;
    expect(CmpApiModel.tcString, 'tcString').to.equal(emptyString);
    expect(CmpApiModel.tcModel.cmpId, 'tcModel.cmpId').to.equal(cmpId);
    expect(CmpApiModel.tcModel.cmpVersion, 'tcModel.cmpVersion').to.equal(cmpVersion);

    window[API_FUNCTION_NAME](TCFCommands.GET_TC_DATA, 2, (tcData: TCData): void => {

      expect(tcData.tcString, 'tcData.tcString').to.equal(emptyString);
      expect(tcData.cmpId, 'tcData.tcModel.cmpId').to.equal(cmpId);
      expect(tcData.cmpVersion, 'tcData.cmpVersion').to.equal(cmpVersion);
      done();

    });

  });

  it('120 AddEventListener: \'cmpuishown\' isn\'t being triggered ', (done: () => void): void => {

    const cmpId = makeRandomInt(2, Math.pow(2, 6));
    const cmpVersion = makeRandomInt(2, Math.pow(2, 6));
    const cmpApi = new CmpApi(cmpId, cmpVersion);
    const numTimes = 6;
    let count = 0;

    window[API_FUNCTION_NAME](TCFCommands.ADD_EVENT_LISTENER, 2, (tcData: TCData): void => {

      count++;

      let eventStatus: EventStatus;

      if (count % 2) {

        eventStatus = EventStatus.CMP_UI_SHOWN;

      } else {

        eventStatus = EventStatus.USER_ACTION_COMPLETE;

      }

      expect(tcData.eventStatus, `evenStatus #${count}`).to.equal(eventStatus);

      if (count === numTimes) {

        done();

      }

    });

    for (let i = 0; i < numTimes; i++) {

      cmpApi.update(TCStringFactory.base(), !(i%2));

    }

  });

  it('164 Queued \'getTCData\' failing when vendorIds is set', (done: () => void): void => {

    let callNum = 0;

    const callback = (tcData: TCData, success: boolean): void => {

      callNum++;

      expect(success, `success call #${callNum}`).to.be.true;
      expect(tcData, `tcData call #${callNum}`).not.to.be.null;

      if (callNum === 2) {

        done();

      }

    };

    window[API_FUNCTION_NAME](TCFCommands.GET_TC_DATA, null, callback);
    window[API_FUNCTION_NAME](TCFCommands.GET_TC_DATA, null, callback, [9]);

    debugger;
    const cmpApi = new CmpApi(makeRandomInt(2, Math.pow(2, 6)), makeRandomInt(2, Math.pow(2, 6)));
    cmpApi.update(TCStringFactory.base());

  });

});
