import {PingCommand} from './PingCommand';
import {GetTCDataCommand} from './GetTCDataCommand';
import {GetInAppTCDataCommand} from './GetInAppTCDataCommand';
import {GetVendorListCommand} from './GetVendorListCommand';
import {AddEventListenerCommand} from './AddEventListenerCommand';
import {RemoveEventListenerCommand} from './RemoveEventListenerCommand';
import {Commands} from '../types/Commands';

export class CommandMap {

  public static [Commands.PING]: typeof PingCommand = PingCommand;
  public static [Commands.GET_TC_DATA]: typeof GetTCDataCommand = GetTCDataCommand;
  public static [Commands.GET_IN_APP_TC_DATA]: typeof GetInAppTCDataCommand = GetInAppTCDataCommand;
  public static [Commands.GET_VENDOR_LIST]: typeof GetVendorListCommand = GetVendorListCommand;
  public static [Commands.ADD_EVENT_LISTENER]: typeof AddEventListenerCommand = AddEventListenerCommand;
  public static [Commands.REMOVE_EVENT_LISTENER]: typeof RemoveEventListenerCommand = RemoveEventListenerCommand; 
}
