import {TCModel} from '@iabtcf/core';
import {CmpCommandStream} from './CmpCommandStream';
import {CmpData} from './CmpData';
import {
  AddEventListenerCommand,
  Command,
  Commands,
  CustomCommand,
  CustomCommandFunction,
  GetInAppTcDataCommand,
  GetTcDataCommand,
  GetVendorListCommand,
  PingCommand,
  RemoveEventListenerCommand,
} from './command';
import {CommandQueue} from './queue/CommandQueue';
import {EventListenerQueue} from './queue/EventListenerQueue';
import {CmpStatus, DisplayStatus, EventStatus} from './status';
import {ArgSet, Callback, CommandArgsHandler, PageCallHandler, Param} from './types';
import {CmpApiUtil, Constants, Validation} from './utilities';
import {isValidatable, Validatable} from './validatable/Validatable';

export interface CustomCommandRegistration {
  command: string;
  customFunction: CustomCommandFunction;
}

/**
 * Consent Management Platform API
 */
export class CmpApi {

  private readonly commandStream: CmpCommandStream;

  private readonly commandQueue: CommandQueue;

  private readonly eventListenerQueue: EventListenerQueue;

  private readonly cmpData: CmpData;

  private customCommandMap = new Map<string, CustomCommandFunction>();

  /**
   * Constructor
   * @param {number} cmpId
   * @param {number} cmpVersion
   * @param {CustomCommandRegistration[]} customCommands
   */
  public constructor(cmpId: number, cmpVersion: number, customCommands: CustomCommandRegistration[] = []) {

    this.cmpData = new CmpData(cmpId, cmpVersion);

    this.registerCustomCommands(customCommands);

    this.eventListenerQueue = new EventListenerQueue();

    this.commandQueue = new CommandQueue();

    this.commandStream = new CmpCommandStream(this.getPageCallHandler(), this.getCommandArgsHandler());

  }

  /**
   * Validates and add custom commands to custom commands map
   * @param {CustomCommandRegistration[]} customCommands
   * @return {void}
   */
  private registerCustomCommands(customCommands: CustomCommandRegistration[]): void {

    customCommands.forEach((cc): void => {

      /**
       * Validate and add custom command to map
       */

      if (Validation.isFunction(cc.customFunction)) {

        this.customCommandMap.set(cc.command, cc.customFunction);

      } else {

        throw Error(Constants.CUSTOM_COMMAND_FUNCTION_INVALID);

      }

    });

  }

  /*
      ======================== START CMP METHODS ========================
      Methods exposed to the cmp to set data. Think I would like to move these somewhere.
   */

  public setTCModel(tcm: TCModel, eventStatus?: EventStatus): void {

    this.cmpData.tcModel = tcm.clone();
    this.cmpData.eventStatus = eventStatus || this.cmpData.eventStatus;
    this.commandQueue.executeAndClearCommands();
    this.eventListenerQueue.executeCommands();

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
       * Validate, if it isn't valid, finish processing command
       */

      if (isValidatable(command) && !command.validate(true).isValid) {

        return;

      }

      /**
       * Queue command if it needs to be
       */

      if (this.shouldCommandBeQueued(commandStr)) {

        /**
         * Command will be placed in a queue to be processed once the api is ready. The lifecycle ends here for this
         * command request.
         */

        this.commandQueue.queueCommand(command);

        return;

      }

      /**
       * Execute the command
       */

      command.execute();

    }

  }

  /**
   * Creates a new Command based on the command string provided
   * @param {string} command
   * @param {number} version
   * @param {Callback} callback
   * @param {Param} param
   * @return {Command | null} returns null if the command is not supported
   */
  private createCommand(command: string, version: number, callback: Callback, param?: Param): Command | null {

    /**
     * Custom commands can over ride the default commands, we will check them first
     * and return a custom command if one has been registered.
     */

    if (this.customCommandMap.has(command)) {

      return new CustomCommand(this.customCommandMap.get(command) as CustomCommandFunction, version, callback, param);

    }

    /**
     * Handle the creation of default commands
     */

    switch (command) {

      case Commands.PING: {

        return new PingCommand(this.cmpData, command, version, callback, param);

      }

      case Commands.GET_TC_DATA: {

        return new GetTcDataCommand(this.cmpData, command, version, callback, param);

      }

      case Commands.GET_IN_APP_TC_DATA: {

        return new GetInAppTcDataCommand(this.cmpData, command, version, callback);

      }

      case Commands.GET_VENDOR_LIST: {

        return new GetVendorListCommand(this.cmpData, command, version, callback, param);

      }

      case Commands.ADD_EVENT_LISTENER: {

        return new AddEventListenerCommand(this.eventListenerQueue, this.cmpData, command, version, callback, param);

      }

      case Commands.REMOVE_EVENT_LISTENER: {

        return new RemoveEventListenerCommand(this.eventListenerQueue, this.cmpData, command, version, callback, param);

      }

      default: {

        /**
         * Command is not supported and has no custom methods defined
         */

        CmpApiUtil.failCallback(callback, `${command} ${Constants.COMMAND_NOT_SUPPORTED}`);

      }

    }

    return null;

  }

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
      const validCommands = commandArgs
        .map((as: ArgSet): Command | Validatable | null => _this.createCommand(...as))
        .filter((command): boolean => command != null)
        .filter((command): boolean => isValidatable(command as Command)
          ? (command as Validatable).validate(true).isValid : true);

      /**
       * Add commands to queue and process/clear them if we can
       */

      // @ts-ignore
      _this.commandQueue.queueCommands(validCommands);

      if (_this.canProcessCommandQueue) {

        _this.commandQueue.executeAndClearCommands();

      }

    };

  }

  /**
   * Returns true if a command needs to be placed in a queue to be processed later
   * @param {string} commandStr
   * @return {boolean}
   */
  private shouldCommandBeQueued(commandStr: string): boolean {

    return commandStr === Commands.PING ? false : !this.canProcessCommandQueue;

  }

  /**
   * Returns true if we can process commands in queues
   * @return {boolean}
   */
  private get canProcessCommandQueue(): boolean {

    return this.cmpData.tcModelIsSet;

  }

}
