import {PingCommand} from './PingCommand';
import {GetTCDataCommand} from './GetTCDataCommand';
import {GetInAppTCDataCommand} from './GetInAppTCDataCommand';
import {GetVendorListCommand} from './GetVendorListCommand';
import {AddEventListenerCommand} from './AddEventListenerCommand';
import {RemoveEventListenerCommand} from './RemoveEventListenerCommand';
import {TCFCommands} from './TCFCommands';

export class CommandMap {

  public static [TCFCommands.PING]: typeof PingCommand = PingCommand;
  public static [TCFCommands.GET_TC_DATA]: typeof GetTCDataCommand = GetTCDataCommand;
  public static [TCFCommands.GET_IN_APP_TC_DATA]: typeof GetInAppTCDataCommand = GetInAppTCDataCommand;
  public static [TCFCommands.GET_VENDOR_LIST]: typeof GetVendorListCommand = GetVendorListCommand;
  public static [TCFCommands.ADD_EVENT_LISTENER]: typeof AddEventListenerCommand = AddEventListenerCommand;
  public static [TCFCommands.REMOVE_EVENT_LISTENER]: typeof RemoveEventListenerCommand = RemoveEventListenerCommand;

}
