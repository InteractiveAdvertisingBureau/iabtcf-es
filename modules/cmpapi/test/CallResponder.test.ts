import {CallResponder} from '../src/CallResponder';
import {CmpApiModel} from '../src/CmpApiModel';
import {CommandCallback} from '../src/command/CommandCallback';
import {TCData} from '../src/response/TCData';
import {TCFCommand} from '../src/command';
import {TCModelFactory} from '@iabtcf/testing';
import {expect} from 'chai';

describe('CallResponder', (): void => {

  it('should call a custom command before tcModel exists', (): void => {

    const command = 'slickCustom';
    let modelSet = false;

    const callResponser = new CallResponder({
      [command]: (callback: () => void): void => {

        expect(modelSet, 'model is set').to.be.false;
        callback();

      },
    });

    callResponser.apiCall(command, null, (): void => {

      expect(modelSet, 'model is set').to.be.false;

    });

    CmpApiModel.tcModel = TCModelFactory.withGVL();
    modelSet = true;

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

});
