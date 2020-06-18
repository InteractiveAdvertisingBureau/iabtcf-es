import {StubCmpApi} from '../src/StubCmpApi';
import {TCFAPI_KEY, TCFAPI_LOCATOR, TCFAPIArgs, TCFCommands, CmpStatus} from '@iabtcf/cmpapi';
import {makeRandomString, makeRandomInt, makeRandomIntArray} from '@iabtcf/testing';
import {expect} from 'chai';

describe('StubCmpApi', (): void => {

  beforeEach((): void => {

    new StubCmpApi();

  });
  afterEach((): void => {

    if (window[TCFAPI_KEY]) {

      delete window[TCFAPI_KEY];

    }

    document.body.innerText = '';

  });

  it(`should create ${TCFAPI_KEY} at the window`, (): void => {

    expect(window[TCFAPI_KEY], `window.${TCFAPI_KEY}`).to.be.a('function');

  });

  it(`should create ${TCFAPI_LOCATOR}`, (): void => {

    expect(window.frames[TCFAPI_LOCATOR], `window.frames.${TCFAPI_LOCATOR}`).to.exist;

  });

  it(`should respond to a ${TCFCommands.PING} command`, (done: () => void): void => {

    window[TCFAPI_KEY](TCFCommands.PING, 2, (ping: {gdprApplies: boolean; cmpLoaded: boolean; cmpStatus: CmpStatus}): void => {

      expect(ping.gdprApplies, 'ping.gdprApplies').to.be.undefined;
      expect(ping.cmpLoaded, 'ping.cmpLoaded').to.be.false;
      expect(ping.cmpStatus, 'ping.cmpStatus').to.equal(CmpStatus.STUB);

      done();

    });

  });

  it(`should set gdprApplies and respond to a ${TCFCommands.PING} command with that value`, (done: () => void): void => {

    const gdprApplies = true;

    window[TCFAPI_KEY]('setGdprApplies', 2, (result: null, success: boolean): void => {

      expect(result, 'result').to.be.null;
      expect(success, 'success').to.be.true;

      window[TCFAPI_KEY](TCFCommands.PING, 2, (ping: {gdprApplies: boolean; cmpLoaded: boolean; cmpStatus: CmpStatus}): void => {

        expect(ping.gdprApplies, 'ping.gdprApplies').to.equal(gdprApplies);
        expect(ping.cmpLoaded, 'ping.cmpLoaded').to.be.false;
        expect(ping.cmpStatus, 'ping.cmpStatus').to.equal(CmpStatus.STUB);

        done();

      });

    }, gdprApplies);

  });

  it(`should queue any command that is not "${TCFCommands.PING}" or "setGdprApplies"`, (): void => {

    const numCommands = 100;
    const commands = [];

    for (let i = 0; i < numCommands; i++) {

      commands.push(makeRandomString(makeRandomInt(10, 20)));

    }

    commands.forEach((command: string): void => {

      window[TCFAPI_KEY](command, 2, expect.fail);

    });

    const queue = window[TCFAPI_KEY]();

    expect(queue, 'queue').to.have.lengthOf(numCommands);

    queue.forEach((argSet: TCFAPIArgs, index: number): void => {

      expect(argSet[0], 'argSet[0]').to.equal(commands[index]);
      expect(argSet[1], 'argSet[1]').to.equal(2);
      expect(argSet[2], 'argSet[2]').to.equal(expect.fail);

    });

  });

  it(`should queue any number of parameters passed`, (): void => {

    const command = 'foo';
    const params = makeRandomIntArray(0, 100, makeRandomInt(5, 50));
    const argParamOffset = 3;
    const argsLen = argParamOffset + params.length;

    window[TCFAPI_KEY](command, 2, expect.fail, ...params);

    const queue = window[TCFAPI_KEY]();

    expect(queue, 'queue').to.have.lengthOf(1);

    const args = queue[0];

    expect(args.length, 'args.length').to.equal(argsLen);
    expect(args[0], 'args[0]').to.equal(command);
    expect(args[1], 'args[1]').to.equal(2);
    expect(args[2], 'args[2]').to.equal(expect.fail);

    for (let i = argParamOffset; i < argsLen; i ++) {

      expect(args[i], `args[${i}]`).to.equal(params[i - argParamOffset]);

    }

  });

});
