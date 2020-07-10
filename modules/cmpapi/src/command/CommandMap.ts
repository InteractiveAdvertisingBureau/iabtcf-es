import {PingCommand} from './PingCommand';
import {GetTCDataCommand} from './GetTCDataCommand';
import {GetInAppTCDataCommand} from './GetInAppTCDataCommand';
import {GetVendorListCommand} from './GetVendorListCommand';
import {AddEventListenerCommand} from './AddEventListenerCommand';
import {RemoveEventListenerCommand} from './RemoveEventListenerCommand';
import {TCFCommand} from './TCFCommand';

export class CommandMap {

  public static [TCFCommand.PING]: typeof PingCommand = PingCommand;
  public static [TCFCommand.GET_TC_DATA]: typeof GetTCDataCommand = GetTCDataCommand;
  public static [TCFCommand.GET_IN_APP_TC_DATA]: typeof GetInAppTCDataCommand = GetInAppTCDataCommand;
  public static [TCFCommand.GET_VENDOR_LIST]: typeof GetVendorListCommand = GetVendorListCommand;
  public static [TCFCommand.ADD_EVENT_LISTENER]: typeof AddEventListenerCommand = AddEventListenerCommand;
  public static [TCFCommand.REMOVE_EVENT_LISTENER]: typeof RemoveEventListenerCommand = RemoveEventListenerCommand;

}
