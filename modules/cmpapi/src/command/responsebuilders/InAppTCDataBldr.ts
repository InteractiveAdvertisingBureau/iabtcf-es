import {IdBoolTuple, TCModel, Vector} from '@iabtcf/core';
import {BooleanVector, InAppTCData, Restrictions} from '../../model';
import {EventStatus} from '../../status';
import {TCDataBldr} from './TCDataBldr';

/**
 * InAppTCData response builder
 */
export class InAppTCDataBldr extends TCDataBldr implements InAppTCData {

  public outOfBand: undefined;

  public constructor(tcModel: TCModel, eventStatus: EventStatus, vendorIds: number[]) {

    super(tcModel, eventStatus, vendorIds);

    /**
     * In app tc data doesn't have the outOfBand field. Setting it to undefined.
     */
    this.outOfBand = undefined;

  }

  /**
   * Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector
   * @override
   * @param {Vector }vector
   * @return {BooleanVector | string}
   */
  protected createVectorField(vector: Vector): BooleanVector | string {

    return this.createBitFieldString(vector);

  }

  /**
   * Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector
   * @param {Vector }vector
   * @return {string}
   */
  protected createBitFieldString(vector: Vector): string {

    return [...vector].reduce<string>((str: string, tpl: IdBoolTuple): string => {

      str += tpl[1] ? '1' : '0';
      return str;

    }, '');

    // return ids.reduce<StringBoolVector>((map, obj) => {
    //
    //   map[obj] = vector.has(+obj) ? '1' : '0';
    //   return map;
    //
    // }, {});

    // return ids.map((id: string): BoolString => vector.has(+id) ? '1' : '0').join('');

  }

  /**
   * Creates a restrictions object given a TCModel
   * @override
   * @param {TCModel} tcModel
   * @return {Restrictions}
   */
  protected createRestrictions(tcModel: TCModel): Restrictions {

    return tcModel.publisherRestrictions.getAllRestrictions().reduce((obj, pr): Restrictions => {

      const purposeId = pr.purposeId.toString(10);

      if (!obj[purposeId]) {

        obj[purposeId] = '';

      }

      tcModel.publisherRestrictions.getVendors(pr).forEach((vendorId: number): void => {

        obj[purposeId] = obj[purposeId] + pr.restrictionType.toString(10);

      });

      return obj;

    }, {});

  };

}
