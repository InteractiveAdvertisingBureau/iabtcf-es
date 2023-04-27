import {CallResponder} from '../src/CallResponder';
import {CmpApiModel} from '../src/CmpApiModel';
import {CommandCallback} from '../src/command/CommandCallback';
import {TCData} from '../src/response/TCData';
import {TCFCommand} from '../src/command';
import {TCModelFactory} from '@didomi/iabtcf-testing';
import {expect} from 'chai';
import * as sinon from 'sinon';

describe('CallResponder', (): void => {

  beforeEach(() => {

    CmpApiModel.reset();

  });

  it('should call a custom command before tcModel exists', (): void => {

    const customCommandCallback = sinon.stub();
    const command = 'slickCustom';
    let modelSet = false;

    const callResponser = new CallResponder({
      [command]: (callback: () => void): void => {

        expect(modelSet, 'model is set').to.be.false;
        callback();
        customCommandCallback();

      },
    });

    callResponser.apiCall(command, null, (): void => {

      expect(modelSet, 'model is set').to.be.false;

    });

    CmpApiModel.tcModel = TCModelFactory.withGVL();
    modelSet = true;
    expect(customCommandCallback.callCount).to.eql(1);

  });

  it('should call a built-in command only after tcModel exists', (): void => {

    const command = TCFCommand.GET_TC_DATA;
    let modelSet = false;

    const callResponser = new CallResponder();

    callResponser.apiCall(command, null, (): void => {

      expect(modelSet, 'model is set').to.be.true;

    });

    CmpApiModel.tcModel = TCModelFactory.withGVL();
    modelSet = true;

  });

  it('should call a built-in custom command only after tcModel exists', (): void => {

    const command = TCFCommand.GET_TC_DATA;
    let modelSet = false;

    const callResponser = new CallResponder({
      [command]: (next: CommandCallback, tcData: TCData): void => {

        next(tcData);

      },
    });

    callResponser.apiCall(command, null, (tcData: TCData): void => {

      expect(modelSet, 'model is set').to.be.true;
      expect(tcData, 'tcData').to.exist;

    });

    CmpApiModel.tcModel = TCModelFactory.withGVL();
    modelSet = true;

  });

  it('should throw an error if attempting to override addEventListener with a custom command', (): void => {

    const command = TCFCommand.ADD_EVENT_LISTENER;

    expect((): void => {

      new CallResponder({
        [command]: (next: CommandCallback, tcData: TCData): void => {

          next(tcData);

        },
      });

    }).to.throw();

  });

  it('should use custom "getTCData" command handler for "addEventListener" command', (): void => {

    const customCommandCallback = sinon.stub();

    const callResponder = new CallResponder({
      [TCFCommand.GET_TC_DATA]: (): void => {

        customCommandCallback();

      },
    });

    CmpApiModel.tcModel = TCModelFactory.withGVL();

    const testNTimesCalls = 3;
    let callCount = 1;

    while (callCount <= testNTimesCalls) {

      // Invoke `getTCData` command and make sure custom callback was called
      callResponder.apiCall(TCFCommand.GET_TC_DATA, null, (): void => undefined);
      callCount++;

    }

    expect(customCommandCallback.callCount).to.eql(testNTimesCalls);

  });
  
  it('should "addEventListener" and "removeEventListener" methods behave properly', (): void => {

    const customCommandCallback = sinon.stub();
    const callResponder = new CallResponder({
      [TCFCommand.GET_TC_DATA]: (): void => {

        customCommandCallback();

      },
    });
    callResponder.apiCall(TCFCommand.ADD_EVENT_LISTENER, null, () => undefined);
    // remove listener id == 0 first time should produce success == true
    callResponder.apiCall(TCFCommand.REMOVE_EVENT_LISTENER, null, (success: boolean) => {

      expect(success).to.be.true;

    }, 0);
    // remove listener id == 0 second time should produce success == false
    callResponder.apiCall(TCFCommand.REMOVE_EVENT_LISTENER, null, (success: boolean) => {

      expect(success).to.be.false;

    }, 0);
    // remove listener id == 1 should produce success == false because it is not added yet
    callResponder.apiCall(TCFCommand.REMOVE_EVENT_LISTENER, null, (success: boolean) => {

      expect(success).to.be.false;

    }, 1);

  });

});
