import {TCModel} from '@iabtcf/core';
import {CmpData} from './cmpdata';
import {CommandBroker, CustomCommandRegistration} from './command';
import {CmpStatus, DisplayStatus, EventStatus} from './status';

/**
 * Consent Management Platform API
 *
 * This is the only class that the CMP should create and interface with to set data for commands to utilize.
 * The page commands are handled via the CommandBroker.
 */
export class CmpApi {

  private readonly cmpData: CmpData;

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

  public setTCModel(tcm: TCModel, eventStatus?: EventStatus): void {

    this.cmpData.setTCModel(tcm.clone(), eventStatus);

  }

  public setGdprApplies(applies: boolean): void {

    this.cmpData.setGdprApplies(applies);

  }

  public setCmpStatus(cmpStatus: CmpStatus): void {

    this.cmpData.setCmpStatus(cmpStatus);

  }

  public setDisplayStatus(displayStatus: DisplayStatus): void {

    this.cmpData.setDisplayStatus(displayStatus);

  }

}
