import {GetTCDataCommand} from '../../src/command/GetTCDataCommand';
import {TCDataCallback} from '../../src/types/TCDataCallback';
import {CmpApiModel} from '../../src/CmpApiModel';
import {TCModelFactory} from '@iabtcf/testing';
import {TCData} from '../../src/response/TCData';
import {expect} from 'chai';

describe('command->GetTCDataCommand', (): void => {

  it('should return a TCData object when called', (done: () => void): void => {

    CmpApiModel.reset();
    CmpApiModel.tcModel = TCModelFactory.noGVL();

    const tcDataCallback: TCDataCallback = function(tcData: TCData): void {

      expect(tcData instanceof TCData, 'tcData instanceof TCData').to.be.true;
      expect(arguments.length, 'arguments.length').to.equal(2);

      done();

    };

    new GetTCDataCommand(tcDataCallback);

  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const runFailWithParam = (badParam: any): void => {

    it(`should return result=null and success=false for param=${badParam}`, (done: () => void): void => {

      new GetTCDataCommand((result: null, success: boolean): void => {

        expect(result, 'result').to.be.null;
        expect(success, 'success').to.be.false;
        done();

      }, badParam);

    });

  };

  runFailWithParam(null);
  runFailWithParam({});
  runFailWithParam('banana');
  runFailWithParam(['banana', 'apple', 'cake']);
  runFailWithParam(1);
  runFailWithParam(true);
  runFailWithParam(false);
  runFailWithParam(0);
  runFailWithParam(1.1);
  runFailWithParam([1.7, 1.34]);

});
