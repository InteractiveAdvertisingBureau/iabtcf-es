import {TCModel} from '@iabtcf/core';
import {CmpCommandStream} from './CmpCommandStream';
import {CmpData} from './CmpData';
import {
  AddEventListenerCommand,
  Command,
  Commands,
  CustomCommand,
  GetInAppTcDataCommand,
  GetTcDataCommand,
  GetVendorListCommand,
  PingCommand,
  RemoveEventListenerCommand,
} from './command';
import {CommandQueue} from './queue/CommandQueue';
import {CmpStatus, DisplayStatus, EventStatus} from './status';
import {ArgSet, Callback, CommandArgsHandler, PageCallHandler, Param} from './types';
import {CmpApiUtil, Constants, Validation} from './utilities';

/**
 * Consent Management Platform API
 */
export class CmpApi {

  private readonly commandStream: CmpCommandStream;

  private readonly commandQueue: CommandQueue;

  private readonly cmpData: CmpData;

  private eventArgSets: ArgSet[];

  private customMethods = {};

  /**
   * Constructor
   * @param {number} cmpId
   * @param {number} cmpVersion
   */
  public constructor(cmpId: number, cmpVersion: number) {

    /**
     * Initialize cmp data, set up frame and replace stub with our command handler
     */

    this.cmpData = new CmpData(cmpId, cmpVersion);

    this.commandQueue = new CommandQueue();

    this.commandStream = new CmpCommandStream(this.getPageCallHandler(), this.getCommandArgsHandler());

  }

  /*
      ======================== START CMP METHODS ========================
      Methods exposed to the cmp to set data. Think I would like to move these somewhere.
   */

  public setTCModel(tcm: TCModel, eventStatus?: EventStatus): void {

    // Todo: DEEP COPY NEEDED!

    this.cmpData.tcModel = tcm;
    this.cmpData.eventStatus = eventStatus || this.cmpData.eventStatus;
    this.commandQueue.processAndClearCommands();

  }

  public setGdprApplies(applies: boolean): void {

    this.cmpData.gdprApplies = applies;

  }

  public setCmpStatus(cmpStatus: CmpStatus): void {

    this.cmpData.cmpStatus = cmpStatus;

  }

  public setDisplayStatus(displayStatus: DisplayStatus): void {

    this.cmpData.displayStatus = displayStatus;

  }

  /*
    ======================== END CMP METHODS ========================
 */

  /**
   * Returns the page call handler function with a reference to this api
   * @return {PageCallHandler}
   */
  private getPageCallHandler(): PageCallHandler {

    return (command: string, version: number, callback: Callback, param?: Param): void => {

      const _this = this;

      _this.pageCallHandler(command, version, callback, param);

    };

  }

  /**
   * Returns the command args handler function with a reference to this api
   * @return {CommandArgsHandler}
   */
  private getCommandArgsHandler(): CommandArgsHandler {

    return (commandArgs: ArgSet[]): void => {

      const _this = this;

      /**
       * Convert and Filter out invalid commands
       */
      const filteredCommands = commandArgs
        .map((as: ArgSet) => _this.createCommand(...as))
        .filter((command: Command | null) => command != null && command.validate('', true));

      /**
       * Add commands to que and process/clear them if we can
       */

      // @ts-ignore
      _this.commandQueue.queueCommands(filteredCommands);

      if (_this.canProcessCommandQueue) {

        _this.commandQueue.processAndClearCommands();

      }

    };

  }

  /**
   * Handler for all page call commands
   * @type {PageCallHandler}
   * @param {string} commandStr
   * @param {number} version
   * @param {Callback} callback
   * @param {Param} param
   */
  private pageCallHandler(commandStr: string, version: number, callback: Callback, param?: Param): void {

    const command = this.createCommand(commandStr, version, callback, param);

    if (command) {

      /**
       * Validate, possibly queue and/or process command
       */

      const validationMessage = '';

      if (!command.validate(validationMessage)) {

        /**
         * Log failed validation message to console and execute command with failed arguments if its a function.
         * End processing of this command by returning void.
         */

        CmpApiUtil.failCallback(callback, validationMessage);

        return;

      }

      /**
       * Queue command if it needs to be
       */

      if (this.shouldCommandBeQueued(command)) {

        /**
         * Command will be placed in a queue to be processed once the api is ready. The lifecycle ends here for this
         * command request.
         */

        this.commandQueue.queueCommand(command);

        return;

      }

      /**
       * Todo: Place in event queue if need be
       */

      /**
       * Execute the command
       */

      command.execute();

    }

  }

  private createCommand(command: string, version: number, callback: Callback, param?: Param): Command | null {

    switch (command) {

      case Commands.PING: {

        return new PingCommand(this.cmpData, command, version, callback, param);

      }

      case Commands.GET_TC_DATA: {

        return new GetTcDataCommand(this.cmpData, command, version, callback, param);

      }

      case Commands.GET_IN_APP_TC_DATA: {

        return new GetInAppTcDataCommand(this.cmpData, command, version, callback, param);

      }

      case Commands.GET_VENDOR_LIST: {

        // TODO: Implement get vendor list

        return new GetVendorListCommand(this.cmpData, command, version, callback, param);

      }

      case Commands.ADD_EVENT_LISTENER: {

        return new AddEventListenerCommand(this.cmpData, command, version, callback, param);

      }

      case Commands.REMOVE_EVENT_LISTENER: {

        return new RemoveEventListenerCommand(this.cmpData, command, version, callback, param);

      }

      default: {

        if (Validation.isFunction(this.customMethods[command])) {

          /**
           * If custom methods were set, process them here.
           * Todo: Handle custom commands
           */

          return new CustomCommand(this.cmpData, command, version, callback, param);

        }

        /**
         * Command is not supported and has no custom methods defined
         */

        CmpApiUtil.failCallback(callback, `${command} ${Constants.COMMAND_NOT_SUPPORTED}`);

      }

    }

    return null;

  }

  /**
   * Returns true if a command needs to be placed in a queue to be processed later
   * @param {Command} command
   * @return {boolean}
   */
  private shouldCommandBeQueued(command: Command): boolean {

    return command.getCommandString() === Commands.PING ? false : !this.canProcessCommandQueue;

  }

  /**
   * Returns true if we can process commands in queues
   * @return {boolean}
   */
  private get canProcessCommandQueue(): boolean {

    return this.cmpData.tcModelIsSet;

  }

}
