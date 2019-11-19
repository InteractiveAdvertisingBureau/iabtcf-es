import {TCModel} from '@iabtcf/core';
import {CmpData} from './cmpdata';
import {CommandBroker, CustomCommandRegistration} from './command';
import {CmpStatus, DisplayStatus, EventStatus} from './status';

/**
 * Consent Management Platform API
 *
 * This is the only class that the CMP should create and interface with to set data for commands to utilize.
 */
export class CmpApi {

  /**
   * cmpData is used throughout the api as the main source of data and its values are set here within CmpApi only.
   */
  private readonly cmpData: CmpData;

  /**
   * Command broker uses cmpData to facilitate page commands.
   */
  private readonly commandBroker: CommandBroker;

  /**
   * Constructor
   * @param {number} cmpId
   * @param {number} cmpVersion
   * @param {CustomCommandRegistration[]} customCommands
   */
  public constructor(cmpId: number, cmpVersion: number, customCommands: CustomCommandRegistration[] = []) {

    this.cmpData = new CmpData(cmpId, cmpVersion);

    this.commandBroker = new CommandBroker(this.cmpData, customCommands);

  }

  /**
   * Sets the TCModel
   * Note: A clone will be used if the cloneable interface was implemented for the model.
   * @param {TCModel} tcModel
   * @param {EventStatus} eventStatus
   */
  public setTCModel(tcModel: TCModel, eventStatus?: EventStatus): void {

    this.cmpData.setTCModel(tcModel, eventStatus);

  }

  /**
   * Sets the value for GDPR Applies
   * @param {boolean} applies
   */
  public setGdprApplies(applies: boolean): void {

    this.cmpData.setGdprApplies(applies);

  }

  /**
   * Sets the current status of the cmp
   * @param {CmpStatus} cmpStatus
   */
  public setCmpStatus(cmpStatus: CmpStatus): void {

    this.cmpData.setCmpStatus(cmpStatus);

  }

  /**
   * Sets the current display status
   * @param {DisplayStatus} displayStatus
   */
  public setDisplayStatus(displayStatus: DisplayStatus): void {

    this.cmpData.setDisplayStatus(displayStatus);

  }

}
