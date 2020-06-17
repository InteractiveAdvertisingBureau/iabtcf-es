import {PingCommand} from '../../src/command/PingCommand';
import {Ping} from '../../src/response/Ping';
import {expect} from 'chai';

describe('command->PingCommand', (): void => {

  it('should return a Ping object (and nothing else) when called', (done: () => void): void => {

    const pingCallback = function(ping: Ping): void {

      expect(ping instanceof Ping, 'ping instanceof Ping').to.be.true;
      expect(arguments.length, 'arguments.length').to.equal(1);

      done();

    };

    new PingCommand(pingCallback);

  });

});
