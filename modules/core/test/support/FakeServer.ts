import * as sinon from 'sinon';

class FakeServer {

  public static server: sinon.SinonFakeServerStatic;

  public static beforeEach(): void {

    FakeServer.server = sinon.fakeServer();
    FakeServer.server.autoRespond = true;

  }
  public static afterEach(): void { }

}

export {FakeServer};
