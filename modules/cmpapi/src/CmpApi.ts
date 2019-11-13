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
import {EventListenerQueue} from './queue/EventListenerQueue';
import {CmpStatus, DisplayStatus, EventStatus} from './status';
import {ArgSet, Callback, CommandArgsHandler, PageCallHandler, Param} from './types';
import {CmpApiUtil, Constants, Validation} from './utilities';

/**
 * Consent Management Platform API
 */
export class CmpApi {

  private readonly commandStream: CmpCommandStream;

  private readonly commandQueue: CommandQueue;

  private readonly eventListenerQueue: EventListenerQueue;

  private readonly cmpData: CmpData;

  private eventArgSets: ArgSet[];

  private customMethods = {};

  /**
   * Constructor
   * @param {number} cmpId
   * @param {number} cmpVersion
   */
  public constructor(cmpId: number, cmpVersion: number) {

    this.cmpData = new CmpData(cmpId, cmpVersion);

    this.eventListenerQueue = new EventListenerQueue();

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
       * Place in event queue if need be
       */
      if (command instanceof AddEventListenerCommand) {

        this.eventListenerQueue.add(callback, command);

        return;

      }

      /**
       * Remove from event listener queue if need be
       */
      if (command instanceof RemoveEventListenerCommand) {

        if (this.eventListenerQueue.remove(callback)) {

          command.execute();

        }

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
        .map((as: ArgSet) => ({callback: as[2], command: _this.createCommand(...as)}))
        .filter((commandArgs) =>
          commandArgs.command != null && commandArgs.command.validate('', true)
        );

      filteredCommands
        .filter((commandArgs) => (commandArgs.command instanceof AddEventListenerCommand))
        // @ts-ignore
        .forEach((commandArgs) => _this.eventListenerQueue.add(commandArgs.callback, commandArgs.command));

      filteredCommands
        .filter((commandArgs) => (
          commandArgs.command instanceof RemoveEventListenerCommand)
          && _this.eventListenerQueue.remove(commandArgs.callback)
        )
        // @ts-ignore
        .forEach((commandArgs) => commandArgs.command.execute());

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
