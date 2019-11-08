import {TCModel} from '@iabtcf/core';
import {CmpCommandStream} from './CmpCommandStream';
import {CmpData} from './CmpData';
import {Commands, GetInAppTcDataCommand, GetTcDataCommand, GetVendorListCommand, PingCommand} from './command';
import {CommandInvoker} from './Invoker/CommandInvoker';
import {CommandArgs} from './model';
import {CommandQueue} from './queue/CommandQueue';
import {CmpStatus, DisplayStatus, EventStatus} from './status';
import {ArgSet, Callback, CommandArgsHandler, PageCallHandler, Param} from './types';
import {CmpApiUtil, Constants, Validation} from './utilities';

/**
 * Consent Management Platform API
 */
export class CmpApi {

  private readonly commandStream: CmpCommandStream;

  private readonly commandInvoker: CommandInvoker;

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
    this.commandQueue.setCommandProcessor(this.getCommandProcessor());

    this.commandStream = new CmpCommandStream(this.getPageCallHandler(), this.getCommandArgsHandler());


    const pingCommand = new PingCommand(this.cmpData);
    const getTcDataCommand = new GetTcDataCommand(this.cmpData);
    const getInAppTcDataCommand = new GetInAppTcDataCommand(this.cmpData);
    const getVendorListCommand = new GetVendorListCommand(this.cmpData);

    this.commandInvoker = new CommandInvoker(this.cmpData);
    this.commandInvoker.registerCommand(Commands.PING, pingCommand);
    this.commandInvoker.registerCommand(Commands.GET_TC_DATA, getTcDataCommand);
    this.commandInvoker.registerCommand(Commands.GET_IN_APP_TC_DATA, getInAppTcDataCommand);
    this.commandInvoker.registerCommand(Commands.GET_VENDOR_LIST, getVendorListCommand);

  }

  /*
      ======================== START CMP METHODS ========================
      Methods exposed to the cmp to set data. Think I would like to move these somewhere.
   */

  public setTCModel(tcm: TCModel, eventStatus?: EventStatus): void {

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
   * Returns the page call handler function with a reference to this api
   * @return {CommandArgsHandler}
   */
  private getCommandArgsHandler(): CommandArgsHandler {

    return (commandArgs: CommandArgs[]): void => {

      const _this = this;

      /**
       * Filter out invalid commands and add them to queue.
       */

      const filteredCommandArgs = commandArgs.filter((ca: CommandArgs) => ca.validate('', true));
      _this.commandQueue.queueCommands(filteredCommandArgs);
      console.log('COMMAND ARGS', commandArgs);
      console.log('FILTERED COMMAND ARGS', filteredCommandArgs);

      if (_this.cmpData.tcModelIsSet) {

        _this.commandQueue.processAndClearCommands();

      }

    };

  }

  /**
   * Handler for all page call commands
   * @type {PageCallHandler}
   * @param {string} command
   * @param {number} version
   * @param {Callback} callback
   * @param {Param} param
   */
  private pageCallHandler(command: string, version: number, callback: Callback, param?: Param): void {

    const commandArgs = new CommandArgs(command, version, callback, param);

    /**
     * First location where validation takes place in the lifecycle of a command.
     */

    const validationMessage = '';

    if (!commandArgs.validate(validationMessage)) {

      /**
       * Log failed validation message to console and execute command with failed arguments if its a function.
       * End processing of this command by returning void.
       */

      CmpApiUtil.failCallback(callback, validationMessage);

      return;

    }

    if (this.shouldCommandBeQueued(commandArgs)) {

      /**
       * Command will be placed in a queue to be processed once the api is ready. The lifecycle ends here for this
       * command request.
       */

      this.commandQueue.queueCommand(commandArgs);

      return;

    }

    this.processCommand(commandArgs);

  }

  /**
   * Maps a commands arguments to it's appropriate command and executes it
   * @param {CommandArgs} commandArgs
   */
  private processCommand(commandArgs: CommandArgs) {

    switch (commandArgs.command) {

      case Commands.PING: {

        this.commandInvoker.execute(Commands.PING, commandArgs.callback, commandArgs.param);
        break;

      }

      case Commands.GET_TC_DATA: {

        // Todo: where are we going to queue up commands?

        this.commandInvoker.execute(Commands.GET_TC_DATA, commandArgs.callback, commandArgs.param);
        break;

      }

      case Commands.GET_IN_APP_TC_DATA: {

        // Todo: where are we going to queue up commands?

        this.commandInvoker.execute(Commands.GET_TC_DATA, commandArgs.callback, commandArgs.param);
        break;

      }

      case Commands.GET_VENDOR_LIST: {

        // Todo: where are we going to queue up commands?

        // TODO: Implement get vendor list

        this.commandInvoker.execute(Commands.GET_VENDOR_LIST, commandArgs.callback, commandArgs.param);
        break;

      }

      case Commands.ADD_EVENT_LISTENER: {

        // Todo: where are we going to queue up commands?

        // this.addEventListener(commandArgs.callback as TCDataCallback);
        break;

      }

      case Commands.REMOVE_EVENT_LISTENER: {

        // Todo: where are we going to queue up commands?

        // this.removeEventListener(commandArgs.callback as TCDataCallback, commandArgs.callback as TCDataCallback);
        break;

      }

      default: {

        if (Validation.isFunction(this.customMethods[commandArgs.command])) {

          /**
           * If custom methods were set, process them here.
           * Todo: Handle custom commands
           */

        } else {

          /**
           * Command is not supported and has no custom methods defined
           */

          CmpApiUtil.failCallback(commandArgs.callback, `${commandArgs.command} ${Constants.COMMAND_NOT_SUPPORTED}`);
          break;

        }

        break;

      }

    }

  }

  /**
   * Returns true if a command needs to be placed in a queue to be processed later
   * @param {CommandArgs} commandArgs
   * @return {boolean}
   */
  private shouldCommandBeQueued(commandArgs: CommandArgs): boolean {

    return commandArgs.command === Commands.PING ? false : !this.cmpData.tcModelIsSet;

  }

  private getCommandProcessor(): (commandArgs: CommandArgs) => void {

    return (commandArgs) => {

      const _this = this;
      return _this.processCommand(commandArgs);

    };

  }

}
