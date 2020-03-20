import {DisabledCommand} from '../../src/command/DisabledCommand';
import {expect} from 'chai';
import {DisabledCallback} from '../../src/callback/DisabledCallback';
import {Disabled} from '../../src/response/Disabled';

describe('command->DisabledCommand', (): void => {

  it('should return a Disabled object (and nothing else) when called', (done: () => void): void => {

    const disabledCallback: DisabledCallback = function(disabled: Disabled, success: boolean): void {

      expect(disabled instanceof Disabled, 'disabled instanceof Disabled').to.be.true;
      expect(success, 'success').to.be.false;

      done();

    };

    new DisabledCommand(disabledCallback);

  });

});
