import {PingCommand} from './PingCommand.js';
import {GetTCDataCommand} from './GetTCDataCommand.js';
import {GetInAppTCDataCommand} from './GetInAppTCDataCommand.js';
import {GetVendorListCommand} from './GetVendorListCommand.js';
import {AddEventListenerCommand} from './AddEventListenerCommand.js';
import {RemoveEventListenerCommand} from './RemoveEventListenerCommand.js';
import {TCFCommand} from './TCFCommand.js';

export class CommandMap {

  public static [TCFCommand.PING]: typeof PingCommand = PingCommand;
  public static [TCFCommand.GET_TC_DATA]: typeof GetTCDataCommand = GetTCDataCommand;
  public static [TCFCommand.GET_IN_APP_TC_DATA]: typeof GetInAppTCDataCommand = GetInAppTCDataCommand;
  public static [TCFCommand.GET_VENDOR_LIST]: typeof GetVendorListCommand = GetVendorListCommand;
  public static [TCFCommand.ADD_EVENT_LISTENER]: typeof AddEventListenerCommand = AddEventListenerCommand;
  public static [TCFCommand.REMOVE_EVENT_LISTENER]: typeof RemoveEventListenerCommand = RemoveEventListenerCommand;

}
