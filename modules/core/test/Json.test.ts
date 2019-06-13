import * as chai from 'chai';
import * as sinon from 'sinon';
import {Json} from '../src/Json';

const expect = chai.expect;

describe('Json->fetch', (): void => {

  const xhr: sinon.SinonFakeXMLHttpRequestStatic = sinon.useFakeXMLHttpRequest();
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];
  const JSON_HEADER: object = {'Content-Type': 'application/json'};

  xhr.onCreate = (xhr): void => {

    requests.push(xhr);

  };

  afterEach((): void => {

    xhr.restore();
    requests = [];

  });

  it('should fetch and parse a json with only a url', (): void => {

    const responseObj: object = {
      foo: 'bar',
    };
    const spy: sinon.SinonSpy = sinon.spy();

    Json.fetch('blah').then(spy).catch(spy);

    requests[0].respond(200, JSON_HEADER, JSON.stringify(responseObj));
    expect(requests.length).to.equal(1);
    expect(spy.calledWith(responseObj));

  });
  /**
  it('should timeout if a timeout is passed', (done): void => {

    const responseObj: object = {
      foo: 'bar',
    };
    const spy: sinon.SinonSpy = sinon.spy();

    Json.fetch('blah', false, 50).then(spy).catch(spy);
    expect(requests.length).to.equal(1);

    setTimeout((): void => {

      debugger;
      requests[0].respond(200, JSON_HEADER, JSON.stringify(responseObj));
      expect(spy.neverCalledWith(responseObj));
      done();

    }, 52);

  });
  */

});
