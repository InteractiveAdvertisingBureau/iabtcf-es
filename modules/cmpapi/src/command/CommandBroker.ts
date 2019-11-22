import {CmpDataReader} from '../cmpdata';
import {CmpStatus} from "../status";
import {
  CallbackFunction,
  CommandArgsHandler,
  PageCallHandler,
  Param,
  TcfApiArgSet,
  TcModelChangeEventHandler,
} from '../types';
import {ValidationMessages, ValidationUtil} from '../validation';
import {isValidatable, Validatable} from '../validation/Validatable';
import {Callback} from './callback/Callback';
import {
  Command,
  Commands,
  CustomCommand,
  CustomCommandFunction,
  GetInAppTcDataCommand,
  GetTcDataCommand,
  GetVendorListCommand,
  PingCommand,
} from './commands';
import {AddEventListenerCommand, RemoveEventListenerCommand} from './commands/eventlistener';
import {CommandStream} from './CommandStream';
import {CustomCommandRegistration} from './CustomCommandRegistration';
import {CommandQueue, EventListenerQueue} from './queues';

/**
 * CommandBroker handles setup, routing, calling validation and facilitating the execution of default and custom.
 * The class handles all the commands the page will issue.
 */
export class CommandBroker {

  private readonly commandStream: CommandStream;

  private readonly commandQueue: CommandQueue;

  private readonly eventListenerQueue: EventListenerQueue;

  private readonly customCommandMap = new Map<string, CustomCommandFunction>();

  private readonly cmpData: CmpDataReader;

  /**
   * Constructor
   * @param {CmpDataReader} cmpData
   * @param {CustomCommandRegistration[]} customCommands
   */
  public constructor(cmpData: CmpDataReader, customCommands: CustomCommandRegistration[] = []) {

    this.cmpData = cmpData;

    this.cmpData.registerTcModelChangeEventCallback(this.getTcModelChangeCallback());

    this.registerCustomCommands(customCommands);

    this.eventListenerQueue = new EventListenerQueue();

    this.commandQueue = new CommandQueue();

    this.commandStream = new CommandStream(this.getPageCallHandler(), this.getCommandArgsHandler());

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

      if (ValidationUtil.isFunction(cc.customFunction)) {

        this.customCommandMap.set(cc.command, cc.customFunction);

      } else {

        throw Error(ValidationMessages.CUSTOM_COMMAND_FUNCTION_INVALID);

      }

    });

  }

  /**
   * Returns the page call handler function with a reference to this api
   * @return {PageCallHandler}
   */
  private getPageCallHandler(): PageCallHandler {

    return (command: string, version: number, callback: CallbackFunction, param?: Param): void => {

      const _this = this;

      _this.pageCallHandler(command, version, callback, param);

    };

  }

  /**
   * Handler for all page call commands
   * @type {PageCallHandler}
   * @param {string} commandStr
   * @param {number} version
   * @param {CallbackFunction} callback
   * @param {Param} param
   */
  private pageCallHandler(commandStr: string, version: number, callback: CallbackFunction, param?: Param): void {

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
   * Returns the command args handler function with a reference to this api
   * @return {CommandArgsHandler}
   */
  private getCommandArgsHandler(): CommandArgsHandler {

    return (commandArgs: TcfApiArgSet[]): void => {

      const _this = this;

      /**
       * Convert and Filter out invalid commands
       */
      const validCommands = commandArgs
        .map((as: TcfApiArgSet): Command | Validatable | null => _this.createCommand(...as))
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
   * Creates a new Command based on the command string provided
   * @param {string} command
   * @param {number} version
   * @param {CallbackFunction} callbackFunction
   * @param {Param} param
   * @return {Command | null} returns null if the command is not supported
   */
  private createCommand(
    command: string, version: number, callbackFunction: CallbackFunction, param?: Param): Command | null {

    const callback: Callback = new Callback(callbackFunction);
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
        callback.fail(`${command} ${ValidationMessages.COMMAND_NOT_SUPPORTED}`);

      }

    }

    return null;

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

    return this.cmpData.tcModelIsSet && (this.cmpData.getCmpStatus() !== CmpStatus.ERROR);

  }

  /**
   * Returns a callback method to handle changes to the TcModel
   * @return {TcModelChangeEventHandler}
   */
  private getTcModelChangeCallback(): TcModelChangeEventHandler {

    return (): void => {

      const _this = this;
      _this.commandQueue.executeAndClearCommands();
      _this.eventListenerQueue.executeCommands();

    };

  }

}
