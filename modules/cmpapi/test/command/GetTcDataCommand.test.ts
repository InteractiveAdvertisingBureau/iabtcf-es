import {GetTcDataCommand} from '../../src/command/GetTcDataCommand';
import {TCDataCallback} from '../../src/types/TCDataCallback';
import {CmpApiModel} from '../../src/CmpApiModel';
import {TCModelFactory} from '@iabtcf/testing';
import {TCData} from '../../src/response/TCData';
import {expect} from 'chai';

describe('command->GetTcDataCommand', (): void => {

  it('should return a TCData object when called', (done: () => void): void => {

    CmpApiModel.tcModel = TCModelFactory.noGVL();

    const tcDataCallback: TCDataCallback = function(tcData: TCData): void {

      expect(tcData instanceof TCData, 'tcData instanceof TCData').to.be.true;
      expect(arguments.length, 'arguments.length').to.equal(2);

      done();

    };

    new GetTcDataCommand(tcDataCallback);

  });

});
