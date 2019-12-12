import * as CallbackTests from './command/callback/Callback.test';
import * as PingCommandTests from './command/commands/PingCommand.test';
import * as GetTcDataCommandTests from './command/commands/GetTcDataCommand.test';
import * as GetIATcDataCommandTests from './command/commands/GetInAppTcDataCommand.test';

CallbackTests.run();
PingCommandTests.run();
GetTcDataCommandTests.run();
GetIATcDataCommandTests.run();
