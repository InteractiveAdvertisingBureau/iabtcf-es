import {assert} from 'chai';
import {CmpData} from '../../../src/cmpdata';
import {Callback} from '../../../src/command/callback/Callback';
import {Commands, PingCommand} from '../../../src/command/commands';
import {Ping} from '../../../src/model';
import {ValidationMessages} from '../../../src/validation';

export function run(): void {

  describe('PingCommand', (): void => {

    const cmpId = 2;
    const cmpVersion = 3;
    const cmpData = new CmpData(cmpId, cmpVersion);

    describe('Constructor', (): void => {

      it('should create a new instance of PingCommand', (): void => {

        const pingCommand = new PingCommand(
          cmpData,
          Commands.PING,
          2,
          new Callback((pingReturn: Ping | null): void => {}));
        assert.isNotNull(pingCommand, 'Did not create a new instance of PingCommand');

      });

    });

    describe('execute', (): void => {

      it('should execute the command and return a Ping object', (done): void => {

        debugger;
        const pingCommand = new PingCommand(cmpData, Commands.PING, 2, new Callback((pingReturn: Ping | null): void => {

          assert.isNotNull(pingReturn, 'Ping returned null');
          pingReturn = pingReturn as Ping;
          assert.equal(pingReturn.cmpId, cmpId, `cmpId did not equal ${cmpId}`);
          assert.equal(pingReturn.cmpVersion, cmpVersion, `cmpVersion did not equal ${cmpVersion}`);
          done();

        }));
        pingCommand.execute();

      });

    });

    describe('validate', (): void => {

      it('should return true if the command is valid', (): void => {

        const pingCommand = new PingCommand(
          cmpData,
          Commands.PING,
          2,
          new Callback((pingReturn: Ping | null): void => {}));

        const validationResult = pingCommand.validate();

        assert.isTrue(validationResult.isValid, `did not return true if the command is valid`);
        assert.equal(validationResult.validationMessages.length, 0);

      });

      it('should return false if the command is not valid version', (): void => {

        const pingCommand = new PingCommand(
          cmpData,
          Commands.PING,
          0,
          new Callback((pingReturn: Ping | null): void => {}));

        const validationResult = pingCommand.validate(true);

        assert.isFalse(validationResult.isValid, `did not return false if the command is not valid`);
        assert.equal(validationResult.validationMessages[0], `Version 0 ${ValidationMessages.NOT_SUPPORTED}`);

      });

      it('should return false if the callback is not valid', (): void => {

        // @ts-ignore
        const pingCommand = new PingCommand(cmpData, Commands.PING, 2, new Callback({}));

        const validationResult = pingCommand.validate();

        assert.isFalse(validationResult.isValid, `did not return false if the command is valid`);
        assert.equal(validationResult.validationMessages[0], ValidationMessages.CALLBACK_REQUIRED);

      });

      it('should pass null to callback if validate passed true for failCallbackIfNotValid for bad command', (done): void => {

        const pingCommand = new PingCommand(
          cmpData,
          '',
          2,
          new Callback((pingReturn: Ping | null): void => {

            assert.isNull(pingReturn, 'did not pass null to callback if validate  passed true for failCallbackIfNotValid');
            done();

          }));

        const validationResult = pingCommand.validate(true);

        assert.isFalse(validationResult.isValid, `did not return false if the command is not valid`);
        assert.equal(validationResult.validationMessages[0], ValidationMessages.COMMAND_INVALID);

      });

    });

  });

}
