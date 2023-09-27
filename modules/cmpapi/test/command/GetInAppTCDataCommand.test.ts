import {GetInAppTCDataCommand} from '../../src/command/GetInAppTCDataCommand';
import {CmpApiModel} from '../../src/CmpApiModel';
import {TCModelFactory} from '@cookiehub/iabtcf-testing';
import {InAppTCData} from '../../src/response/InAppTCData';
import {expect} from 'chai';

describe('command->GetInAppTCDataCommand', (): void => {

  it('should return a InAppTCData object when called', (done: () => void): void => {

    CmpApiModel.tcModel = TCModelFactory.withGVL();

    const tcDataCallback = function(tcData: InAppTCData): void {

      expect(tcData instanceof InAppTCData, 'tcData instanceof InAppTCData').to.be.true;
      expect(arguments.length, 'arguments.length').to.equal(2);

      done();

    };

    new GetInAppTCDataCommand(tcDataCallback);

  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const runFailWithParam = (badParam: any): void => {

    it(`should return result=null and success=false for param=${badParam}`, (done: () => void): void => {

      new GetInAppTCDataCommand((result: null, success: boolean): void => {

        expect(result).to.be.null;
        expect(success).to.be.false;
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
  runFailWithParam(0);
  runFailWithParam(1.1);
  runFailWithParam([1.7, 1.34]);

});
