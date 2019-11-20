import {TCModel, Vector} from '@iabtcf/core';
import {BooleanVector, InAppTCData, Restrictions} from '../../model';
import {EventStatus} from '../../status';
import {BoolString} from '../../types';
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

    return ids.map((id: string): BoolString => vector.has(+id) ? '1' : '0').join('');

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

      tcModel.publisherRestrictions.getVendors(pr).forEach((): void => {

        (obj[purposeId] as string).concat(pr.restrictionType.toString(10));

      });

      return obj;

    }, {});

  };

}
