import {PingCommand} from './PingCommand';
import {GetTcDataCommand} from './GetTcDataCommand';
import {GetInAppTcDataCommand} from './GetInAppTcDataCommand';
import {GetVendorListCommand} from './GetVendorListCommand';
import {AddEventListenerCommand} from './AddEventListenerCommand';
import {RemoveEventListenerCommand} from './RemoveEventListenerCommand';

export class CommandMap {

  public static ping: typeof PingCommand = PingCommand;
  public static getTCData: typeof GetTcDataCommand = GetTcDataCommand;
  public static getInAppTCData: typeof GetInAppTcDataCommand = GetInAppTcDataCommand;
  public static getVendorList: typeof GetVendorListCommand = GetVendorListCommand;
  public static addEventListener: typeof AddEventListenerCommand = AddEventListenerCommand;
  public static removeEventListener: typeof RemoveEventListenerCommand = RemoveEventListenerCommand;

}
