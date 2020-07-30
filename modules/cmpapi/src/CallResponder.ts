import {CommandCallback, TCFCommand} from './command';
import {CommandMap} from './command/CommandMap';
import {CmpApiModel} from './CmpApiModel';
import {Disabled} from './response/Disabled';
import {CustomCommands} from './CustomCommands';
import {SupportedVersions} from './SupportedVersions';

export const API_KEY = '__tcfapi';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type APIArgs = [string, number, CommandCallback, ...any[]];

type GetQueueFunction = () => APIArgs[];
type PageCallHandler = (...APIArgs) => void;

export class CallResponder {

  private callQueue: APIArgs[];
  private readonly customCommands: CustomCommands;

  public constructor(customCommands?: CustomCommands) {

    this.customCommands = customCommands;

    /**
     * Attempt to grab the queue – we could call ping and see if it is the stub,
     * but instead we'll just a feature-detection method of just trying to get
     * a queue by calling the function with no parameters and see if we get a
     * queue back. If there is no stub or the stub doesn't return the queue by
     * calling with no arguments, then we'll just move on and create our
     * function.
     */
    try {

      // get queued commands
      this.callQueue = (window[API_KEY] as GetQueueFunction)();

    } catch (err) {

      this.callQueue = [];

    } finally {

      window[API_KEY] = this.apiCall.bind(this);

    }

    this.purgeQueuedCalls();

  }

  /**
   * Handler for all page call commands
   * @param {string} command
   * @param {number} version
   * @param {CommandCallback} callback
   * @param {any} [param]
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public apiCall(command: string, version: number, callback: CommandCallback, ...params: any): void | never {

    if (typeof command !== 'string') {

      callback(null, false);

    } else if (!SupportedVersions.has(version)) {

      /**
       * Loosely checking version here on purpose.  If a string is passed
       * that's probably ok, we don't need strict adherence here.
       */

      callback(null, false);

    } else if (typeof callback !== 'function') {

      throw new Error('invalid callback function');

    } else if (CmpApiModel.disabled) {

      callback(new Disabled(), false);

    } else if (!this.isCustomCommand(command) && !this.isBuiltInCommand(command)) {

      /**
       * This check is here just because the call shouldn't be queued if it's
       * something we know isn't going to work.  It's kind of like breaking off a bad
       * relationshipthe instant you know things are not going to work out
       * instead of letting it linger.
       */

      callback(null, false);

    } else if (this.isCustomCommand(command) && !this.isBuiltInCommand(command)) {

      this.customCommands[command](callback, ...params);

    } else if (command === TCFCommand.PING) {

      /**
       * if it's a ping we always respond right away regardless of our tcModel
       * status or other things.
       */
      if (this.isCustomCommand(command)) {

        new CommandMap[command](this.customCommands[command], params[0], null, callback);

      } else {

        new CommandMap[command](callback, params[0]);

      }

      /**
       * tcModel will be either:
       * 1. undefined - update has not been called
       * 2. null - gdpr does not apply
       * 3. Valid TCModel - gdpr applies and update was called
       */

    } else if (CmpApiModel.tcModel === undefined) {

      /**
       * If we are still waiting for the TC data to be set we can push this
       * onto the queue that we have and once the model is set it'll be called
       */
      this.callQueue.push([command, version, callback, ...params]);

    } else if (this.isCustomCommand(command) && this.isBuiltInCommand(command)) {

      new CommandMap[command](this.customCommands[command], params[0], null, callback);

    } else {

      /**
       * at this point we know the command exists and we are free to call it
       */

      new CommandMap[command](callback, params[0]);

    }

  }

  /**
   * purgeQueuedCalls - if there have been calls that are queued up this method
   * will go through and call them in a FIFO order
   *
   * @return {void}
   */
  public purgeQueuedCalls(): void {

    const apiCall = this.apiCall.bind(this);
    const queueCopy: APIArgs[] = this.callQueue;

    this.callQueue = [];
    queueCopy.forEach((args: APIArgs): void => {

      apiCall(...args);

    });

  }

  /**
   * Checks to see if the command exists in the set of custom commands
   *
   * @param {string} command - command to check
   * @return {boolean} - whether or not this command is a custom command
   */
  private isCustomCommand(command: string): boolean {

    return ((this.customCommands && typeof this.customCommands[command] === 'function'));

  }

  /**
   * Checks to see if the command exists in the set of TCF Commands
   *
   * @param {string} command - command to check
   * @return {boolean} - whether or not this command is a built-in command
   */
  private isBuiltInCommand(command: string): boolean {

    return ((CommandMap[command] !== undefined));

  }

}
