import {expect} from 'chai';
import * as sinon from 'sinon';
import {Json} from '../src/Json';
import {XMLHttpTestTools} from '@didomi/iabtcf-testing';

describe('Json->fetch', (): void => {

  const responseObj: object = {
    foo: 'bar',
  };

  beforeEach(function() {

    XMLHttpTestTools.beforeEach();

  });

  it('should fetch and parse a json with only a url', (done: () => void): void => {

    Json.fetch('blah')
      .then((response: object): void => {

        expect(response).to.deep.equal(responseObj);
        done();

      })
      .catch((error: Error): void => {

        expect.fail('an error occured: ' + error.message);
        done();

      });

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(responseObj));

  });

  it('should fail if a 404 returned', (done: () => void): void => {

    Json.fetch('blah')
      .then((): void => {

        expect.fail('should have errored out');
        done();

      })
      .catch((error: Error): void => {

        expect(error.message).to.include('404');
        done();

      });

    XMLHttpTestTools.requests[0].respond(404, {}, '');

    expect(XMLHttpTestTools.requests.length).to.equal(1);

  });

  it('should fail if a network error occurs', (done: () => void): void => {

    Json.fetch('blah')
      .then((): void => {

        expect.fail('should have errored out');
        done();

      })
      .catch((error: Error): void => {

        expect(error.message).to.include('error');
        done();

      });

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');

    req.error();

  });

  /**
  it('should error if it times out', (done: () => void): void => {

    Json.fetch('blah', false, 5)
      .then((): void => {

        expect.fail('should have timed out');
        done();

      })
      .catch((error: Error): void => {

        expect(error.message).to.include('Timeout');
        done();

      });

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');

// this doesn't exist even though the type deff is there and it's in the docs
    req.autoRespond(2005);

  });
  */

});

describe('Json->post', (): void => {

  beforeEach(function() {

    XMLHttpTestTools.beforeEach();

  });

  const responseObj: object = {
    foo: 'bar',
  };
  const postBody: object = {
    foop: 'blarg',
  };

  it('should post and parse a json with a url and body', (done: () => void): void => {

    Json.post('blah', postBody)
      .then((response: object): void => {

        expect(response).to.deep.equal(responseObj);
        done();

      })
      .catch((error: Error): void => {

        expect.fail('an error occured: ' + error.message);
        done();

      });

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method, 'method').to.equal('POST');
    expect(req.requestBody, 'requestBody').to.equal(JSON.stringify(postBody));

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(responseObj));

  });

  it('should fail if a 404 returned', (done: () => void): void => {

    Json.post('blah', postBody)
      .then((): void => {

        expect.fail('should have errored out');
        done();

      })
      .catch((error: Error): void => {

        expect(error.message).to.include('404');
        done();

      });
    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method, 'method').to.equal('POST');
    expect(req.requestBody, 'requestBody').to.equal(JSON.stringify(postBody));
    expect(XMLHttpTestTools.requests.length).to.equal(1);

    XMLHttpTestTools.requests[0].respond(404, {}, '');

  });

  it('should fail if a network error occurs', (done: () => void): void => {

    Json.post('blah', postBody)
      .then((): void => {

        expect.fail('should have errored out');
        done();

      })
      .catch((error: Error): void => {

        expect(error.message).to.include('error');
        done();

      });

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('POST');
    expect(req.requestBody, 'requestBody').to.equal(JSON.stringify(postBody));
    expect(XMLHttpTestTools.requests.length).to.equal(1);

    req.error();

  });

  /**
  it('should error if it times out', (done: () => void): void => {

    Json.fetch('blah', false, 5)
      .then((): void => {

        expect.fail('should have timed out');
        done();

      })
      .catch((error: Error): void => {

        expect(error.message).to.include('Timeout');
        done();

      });

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');

// this doesn't exist even though the type deff is there and it's in the docs
    req.autoRespond(2005);

  });
  */

});
