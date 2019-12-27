import {PingCommand} from './PingCommand';
import {GetTCDataCommand} from './GetTCDataCommand';
import {GetInAppTCDataCommand} from './GetInAppTCDataCommand';
import {GetVendorListCommand} from './GetVendorListCommand';
import {AddEventListenerCommand} from './AddEventListenerCommand';
import {RemoveEventListenerCommand} from './RemoveEventListenerCommand';

export class CommandMap {

  public static ping: typeof PingCommand = PingCommand;
  public static getTCData: typeof GetTCDataCommand = GetTCDataCommand;
  public static getInAppTCData: typeof GetInAppTCDataCommand = GetInAppTCDataCommand;
  public static getVendorList: typeof GetVendorListCommand = GetVendorListCommand;
  public static addEventListener: typeof AddEventListenerCommand = AddEventListenerCommand;
  public static removeEventListener: typeof RemoveEventListenerCommand = RemoveEventListenerCommand;

}
