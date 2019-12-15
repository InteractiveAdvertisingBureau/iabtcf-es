import {TCModel} from '@iabtcf/core';
import {CmpService} from './cmp/CmpService';
import {CmpData} from './cmpdata';
import {CommandBroker, CustomCommandRegistration} from './command';
import {CmpStatus} from './status';
import {CmpLog} from './utilities';

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
   * Command broker uses cmpData to facilitate page requests as commands.
   */
  private readonly commandBroker: CommandBroker;

  /**
   * Cmp service handles the actions requested by the cmp
   */
  private readonly cmpService: CmpService;

  /**
   * Constructor
   * @param {number} cmpId
   * @param {number} cmpVersion
   * @param {CustomCommandRegistration[]} customCommands
   */
  public constructor(cmpId: number, cmpVersion: number, customCommands: CustomCommandRegistration[] = []) {

    this.cmpData = new CmpData(cmpId, cmpVersion);
    this.cmpService = new CmpService(this.cmpData);
    this.commandBroker = new CommandBroker(this.cmpData, customCommands);

  }

  /**
   * Sets the TCModel the commands will use to facilitate page requests
   * @param {TCModel | null} tcModel
   */
  public set tcModel(tcModel: TCModel | null) {

    // Catch errors and set error cmp status and stop serving requests.
    try {

      this.cmpService.setTcModel(tcModel);

    } catch (e) {

      this.cmpData.setCmpStatus(CmpStatus.ERROR);
      CmpLog.error(e);
      throw e;

    }

  }

  /**
   * Sets whether or not the CMP is going to show the CMP UI to the user.
   * @param {boolean} isVisible
   */
  public set uiVisible(isVisible: boolean) {

    // Catch errors and set error cmp status and stop serving requests.
    try {

      this.cmpService.setUiVisible(isVisible);

    } catch (e) {

      this.cmpData.setCmpStatus(CmpStatus.ERROR);
      CmpLog.error(e);
      throw e;

    }

  }

  /**
   * Disables the CmpApi from serving anything but ping and custom commands
   * Cannot be undone
   */
  public disable(): void {

    this.cmpService.disable();

  }

}
