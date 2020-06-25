import {CallResponder} from '../src/CallResponder';
import {CmpApiModel} from '../src/CmpApiModel';
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

    const command = 'getTCData';
    let modelSet = false;

    const callResponser = new CallResponder();

    callResponser.apiCall(command, null, (): void => {

      expect(modelSet, 'model is set').to.be.true;

    });

    CmpApiModel.tcModel = TCModelFactory.withGVL();
    modelSet = true;

  });

});
