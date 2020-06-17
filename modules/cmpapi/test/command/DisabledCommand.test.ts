import {DisabledCommand} from '../../src/command/DisabledCommand';
import {expect} from 'chai';
import {Disabled} from '../../src/response/Disabled';

describe('command->DisabledCommand', (): void => {

  it('should return a Disabled object (and nothing else) when called', (done: () => void): void => {

    const disabledCallback = function(disabled: Disabled, success: boolean): void {

      expect(disabled instanceof Disabled, 'disabled instanceof Disabled').to.be.true;
      expect(success, 'success').to.be.false;

      done();

    };

    new DisabledCommand(disabledCallback);

  });

});
