import * as sinon from 'sinon';

export class XMLHttpTestTools {

  public static JSON_HEADER: object = {'Content-Type': 'application/json'};
  private static xhr: sinon.SinonFakeXMLHttpRequestStatic;
  public static requests: sinon.SinonFakeXMLHttpRequest[];

  public static beforeEach(): void {

    this.xhr = sinon.useFakeXMLHttpRequest();
    this.requests = [];

    this.xhr.onCreate = (xhr: sinon.SinonFakeXMLHttpRequest): void => {

      this.requests.push(xhr);

    };

  }

}
