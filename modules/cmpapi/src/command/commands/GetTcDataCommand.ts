import {CmpDataReader} from '../../cmpdata';
import {TCData} from '../../model';
import {Callback, Param, TCDataCallback} from '../../types';
import {CmpApiUtil, Constants} from '../../utilities';
import {Validatable} from '../../validatable/Validatable';
import {ValidationResult} from '../../validatable/ValidationResult';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class GetTcDataCommand extends BaseCommand implements Command, Validatable {

  public constructor(cmpData: CmpDataReader, command: string, version: number, callback: Callback, param?: Param) {

    super(cmpData, command, version, callback, param);

  }

  /**
   * Executes the get tc data command
   */
  public execute(): void {

    const tcData = new TCData(this.cmpData.getTcModel(), this.cmpData.getEventStatus(), this.param as number[]);
    this.setBaseReturnFields(tcData);
    (this.callback as TCDataCallback)(tcData, true);

  }

  /**
   * Validates the vendor list was valid and returns the result.
   * Base class validation is also handled.
   * @param {boolean} failCallbackIfNotValid
   * @return {ValidationResult}
   */
  public validate(failCallbackIfNotValid: boolean = false): ValidationResult {

    const validationResult = super.validate(failCallbackIfNotValid);

    if (!this.isVendorsListValid()) {

      validationResult.validationMessages.push(Constants.VENDOR_LIST_INVALID);
      validationResult.isValid = false;

      if (failCallbackIfNotValid) {

        CmpApiUtil.failCallback(this.callback, validationResult.validationMessages);

      }

    }

    return validationResult;

  }

}
