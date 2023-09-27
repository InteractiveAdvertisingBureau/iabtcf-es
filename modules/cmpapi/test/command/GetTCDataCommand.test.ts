import {CmpApiModel} from '../../src/CmpApiModel';
import {TCModelFactory, TCStringFactory, XMLHttpTestTools} from '@cookiehub/iabtcf-testing';
import {GetTCDataCommand} from '../../src/command/GetTCDataCommand';
import {TCData} from '../../src/response/TCData';
import {TCString} from '@cookiehub/iabtcf-core';
import {expect} from 'chai';

describe('command->GetTCDataCommand', (): void => {

  it('should return a TCData object when called', (done: () => void): void => {

    CmpApiModel.gdprApplies = true;
    CmpApiModel.tcModel = TCModelFactory.withGVL();
    CmpApiModel.tcString = TCString.encode(CmpApiModel.tcModel);

    const tcDataCallback = (tcData: TCData, success: boolean): void => {

      expect(success, 'success').to.be.true;
      expect(tcData instanceof TCData, 'tcData instanceof TCData').to.be.true;

      done();

    };

    new GetTCDataCommand(tcDataCallback);

  });

  it('should return a TCData object and should not get a GVL if a tcString is set instead of tcModel', (done: () => void): void => {

    CmpApiModel.gdprApplies = true;
    CmpApiModel.tcString = TCStringFactory.base();
    CmpApiModel.tcModel = TCString.decode(CmpApiModel.tcString);

    const tcDataCallback = (tcData: TCData, success: boolean): void => {

      expect(success, 'success').to.be.true;
      expect(tcData instanceof TCData, 'tcData instanceof TCData').to.be.true;
      expect(tcData.tcString, 'tcString').to.equal(CmpApiModel.tcString);

      done();

    };

    new GetTCDataCommand(tcDataCallback);

    expect(XMLHttpTestTools.requests.length, 'XMLHttpTestTools.requests.length').to.equal(0);

  });

  it('should return a TCData object with a subset of vendors if a list of ids are passed', (done: () => void): void => {

    const vendors = [16, 18];
    CmpApiModel.gdprApplies = true;
    CmpApiModel.tcModel = TCModelFactory.withGVL();
    CmpApiModel.tcString = TCString.encode(CmpApiModel.tcModel);

    new GetTCDataCommand((tcData: TCData, success: boolean): void => {

      expect(success, 'success').to.be.true;
      expect(tcData instanceof TCData, 'tcData instanceof TCData').to.be.true;

      expect(Object.keys(tcData.vendor.consents), 'tcData.vendor.consents').to.have.lengthOf(vendors.length);
      vendors.forEach((vendorId: number): void => {

        expect(tcData.vendor.consents, 'tcData.vendor.consents').to.have.property(vendorId.toString());

      });

      done();

    }, vendors);

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
