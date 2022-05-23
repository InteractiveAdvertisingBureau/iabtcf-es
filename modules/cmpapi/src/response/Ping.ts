import {CmpStatus, DisplayStatus} from '../status/index.js';
import {CmpApiModel} from '../CmpApiModel.js';
import {Response} from './Response.js';

/**
 * Ping response builder
 */
export class Ping extends Response {

  /**
   * true - CMP main script is loaded
   * false - still running stub
   */
  public cmpLoaded = true;

  /**
   * see Ping Status Codes in following table
   */
  public cmpStatus: CmpStatus = CmpApiModel.cmpStatus;

  /**
   * see Ping Status Codes in following table
   */
  public displayStatus: DisplayStatus = CmpApiModel.displayStatus;

  /**
   * version of the CMP API that is supported; e.g. “2”
   */
  public apiVersion: string = String(CmpApiModel.apiVersion);

  /**
   * Version of the GVL currently loaded by the CMP
   * undefined if still the stub
   */
  public gvlVersion: number;

  public constructor() {

    super();

    // only if the tcModel is defined
    if (CmpApiModel.tcModel && CmpApiModel.tcModel.vendorListVersion) {

      this.gvlVersion = +CmpApiModel.tcModel.vendorListVersion;

    }

  }

}
