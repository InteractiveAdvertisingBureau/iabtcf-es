import {TCModel, Vector} from '@iabtcf/core';
import {EventStatus} from '../../status';
import {BooleanVector} from '../BooleanVector';
import {Restrictions} from '../Restrictions';
import {TCData} from './TCData';

export class InAppTCData extends TCData {

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
   * @param {string[]} ids
   * @param {Vector }vector
   * @return {BooleanVector | string}
   */
  protected createVectorField(ids: string[], vector: Vector): BooleanVector | string {

    return this.createBitFieldString(ids, vector);

  }

  /**
   * Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector
   * @param {string[]} ids
   * @param {Vector }vector
   * @return {string}
   */
  protected createBitFieldString(ids: string[], vector: Vector): string {

    return ids.map((id: string) => vector.has(+id) ? '1' : '0').join('');

  }

  /**
   * Creates a restrictions object given a TCModel
   * @override
   * @param {TCModel} tcModel
   * @return {Restrictions}
   */
  protected createRestrictions(tcModel: TCModel): Restrictions {

    return tcModel.publisherRestrictions.getAllRestrictions().reduce<Restrictions>((obj, pr): Restrictions => {

      const purposeId = pr.purposeId.toString(10);
      obj[purposeId] = '';

      tcModel.publisherRestrictions.getVendors(pr).forEach((vendorId: number) => {

        (obj[purposeId] as string).concat(pr.restrictionType.toString(10));

      });

      return obj;

    }, {});

  };

}