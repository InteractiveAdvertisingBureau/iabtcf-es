import * as stub from '@iabtcf/stub';
import * as sinon from 'sinon';
import {API_KEY, CmpApi} from '../src/';
import {CmpApiModel} from '../src/CmpApiModel';
import {Disabled, Response, TCData, InAppTCData} from '../src/response';
import {EventStatus} from '../src/status/EventStatus';
import {TCFCommand} from '../src/command/TCFCommand';
import {TestUtils} from './TestUtils';
import {expect} from 'chai';
import {makeRandomInt, TCStringFactory} from '@iabtcf/testing';

describe('Reported issues', (): void => {

  const removeStub = (): void =>{

    // clean up that junk
    if (typeof window[API_KEY] === 'function') {

      delete window[API_KEY];

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
    CmpApiModel.reset();

  });

  afterEach((): void => {

    removeStub();

  });

  it('Issue 96 CmpApi should respond to addEventListener call with an error object when in an Error state', (done: () => void): void => {

    const cmpApi = TestUtils.getCmpApi();

    cmpApi.update(TCStringFactory.base());
    cmpApi.disable();

    window[API_KEY](TCFCommand.ADD_EVENT_LISTENER, 2, (response: Response): void => {

      expect(response instanceof Disabled, 'response instanceof Disabled').to.be.true;

      done();

    });

  });

  it('Should not throw an error if getTCData is called before update is called', (done: () => void): void => {

    const cmpApi = TestUtils.getCmpApi();

    const callDatFunc = (): void => {

      window[API_KEY](TCFCommand.GET_TC_DATA, 2, (response: Response): void => {

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

    window[API_KEY](TCFCommand.GET_TC_DATA, 2, (tcData: TCData): void => {

      expect(tcData.tcString, 'tcData.tcString').to.equal(emptyString);
      expect(tcData.cmpId, 'tcData.tcModel.cmpId').to.equal(cmpId);
      expect(tcData.cmpVersion, 'tcData.cmpVersion').to.equal(cmpVersion);
      done();

    });

  });

  it('120 AddEventListener: \'cmpuishown\' isn\'t being triggered - test toggles update UIVisible', (done: () => void): void => {

    const cmpId = makeRandomInt(2, Math.pow(2, 6));
    const cmpVersion = makeRandomInt(2, Math.pow(2, 6));
    const numTimes = 4;
    let count = 0;

    window[API_KEY](TCFCommand.ADD_EVENT_LISTENER, 2, (tcData: TCData, success: boolean): void => {

      count++;

      let eventStatus: EventStatus;

      if (count % 2) {

        eventStatus = EventStatus.CMP_UI_SHOWN;

      } else {

        eventStatus = EventStatus.USER_ACTION_COMPLETE;

      }

      expect(success, `success #${count}`).to.be.true;
      expect(tcData, `tcData #${count}`).not.to.be.null;
      expect(tcData.eventStatus, `evenStatus #${count}`).to.equal(eventStatus);

      if (count === numTimes) {

        done();

      }

    });

    const cmpApi = new CmpApi(cmpId, cmpVersion);

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

    window[API_KEY](TCFCommand.GET_TC_DATA, null, callback);
    window[API_KEY](TCFCommand.GET_TC_DATA, null, callback, [9]);

    const cmpApi = TestUtils.getCmpApi();

    cmpApi.update(TCStringFactory.base());

  });

  it('195 getInAppTCData no longer returns a success argument', (): void => {

    const callback = (inAppTCData: InAppTCData, success: boolean): void => {

      expect(inAppTCData, 'InAppTCData').not.to.be.null;
      expect(success, 'success').to.be.true;

    };

    window[API_KEY](TCFCommand.GET_IN_APP_TC_DATA, null, callback);

    const cmpApi = TestUtils.getCmpApi();

    cmpApi.update(TCStringFactory.base());

  });

  it('196 should not call callback twice on addEventListener', (): void => {

    const callback = sinon.fake();

    window[API_KEY](TCFCommand.ADD_EVENT_LISTENER, null, callback);
    expect(callback.callCount, 'callback.callCount :: Before CMP API Created').to.equal(0);

    const cmpApi = TestUtils.getCmpApi();

    expect(callback.callCount, 'callback.callCount :: After CMP API Created').to.equal(0);
    cmpApi.update(TCStringFactory.base());
    expect(callback.callCount, 'callback.callCount :: After CmpApi.update()').to.equal(1);

  });

  it('208 Custom Commands no longer get called before update', (): void => {

    const callback = sinon.fake();
    const command = sinon.stub();
    const commandName = 'makeASandwich';

    command.callsFake(callback);

    // call custom command to the stub
    window[API_KEY](commandName, null, callback);

    // expect the callback not to be called yet because it's still the stub
    expect(callback.callCount, 'callback.callCount :: Before CMP API Created').to.equal(0);

    const cmpApi = TestUtils.getCmpApi({
      [commandName]: command,
    });

    // expect the callback to be called because it should be called on creation
    expect(callback.callCount, 'callback.callCount :: After CMP API Created').to.equal(1);

    cmpApi.update(TCStringFactory.base());

    // expect the callback not to be called again on update, should equal the last time
    expect(callback.callCount, 'callback.callCount :: After CmpApi.update()').to.equal(1);

  });

  it('220 Events are not triggered in addEventListener() after update() in invoked with uiVisible=false', (): void => {

    const spy = sinon.spy();
    const tcString = 'CO5dPi4O5dPx2B7DvCENA2CgAAAAAAAAAAAAGewAAM8gAAAA.YAAAAAAAAAAA';
    const cmpApi = new CmpApi(makeRandomInt(2, 100), makeRandomInt(2, 100), true);

    window[API_KEY]('addEventListener', 2, spy);

    cmpApi.update(tcString, false);
    cmpApi.update(tcString, true);
    cmpApi.update(tcString, false);
    cmpApi.update(tcString, true);
    cmpApi.update(tcString, false);

    expect(spy.callCount, 'spy callCount').to.equal(5);

    let tcData = spy.getCall(0).args[0];

    expect(tcData.eventStatus, `call 0 eventStatus`).to.equal(EventStatus.TC_LOADED);

    tcData = spy.getCall(1).args[0];

    expect(tcData.eventStatus, `call 1 eventStatus`).to.equal(EventStatus.CMP_UI_SHOWN);

    tcData = spy.getCall(2).args[0];

    expect(tcData.eventStatus, `call 2 eventStatus`).to.equal(EventStatus.USER_ACTION_COMPLETE);

    tcData = spy.getCall(3).args[0];

    expect(tcData.eventStatus, `call 3 eventStatus`).to.equal(EventStatus.CMP_UI_SHOWN);

    tcData = spy.getCall(4).args[0];

    expect(tcData.eventStatus, `call 4 eventStatus`).to.equal(EventStatus.USER_ACTION_COMPLETE);

  });

});
