import * as sinon from 'sinon';

export class XMLHttpTestTools {

  public static JSON_HEADER: object = {'Content-Type': 'application/json'};
  private static xhr: sinon.SinonFakeXMLHttpRequestStatic;
  public static requests: sinon.SinonFakeXMLHttpRequest[];

  public static beforeEach(): void {

    XMLHttpTestTools.xhr = sinon.useFakeXMLHttpRequest();
    XMLHttpTestTools.requests = [];

    XMLHttpTestTools.xhr.onCreate = (xhr: sinon.SinonFakeXMLHttpRequest): void => {

      XMLHttpTestTools.requests.push(xhr);

    };

  }
  public static afterEach(): void {

    XMLHttpTestTools.xhr.restore();

  }

}
