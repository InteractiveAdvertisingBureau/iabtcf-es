import {DisabledCommand} from '../../src/command/DisabledCommand';
import {DisabledCallback} from '../../src/callback';
import {Disabled} from '../../src/response/Disabled';
import {expect} from 'chai';

describe('command->DisabledCommand', (): void => {

  it('should return a Disabled object (and nothing else) when called', (done: () => void): void => {

    const disabledCallback: DisabledCallback = function(disabled: Disabled): void {

      expect(disabled instanceof Disabled, 'disabled instanceof Disabled').to.be.true;
      expect(arguments.length, 'arguments.length').to.equal(1);

      done();

    };

    new DisabledCommand(disabledCallback);

  });

});
