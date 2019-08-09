export class Ping {

  /**
   * true - the user or Publisher is determined to be within the
   * jurisdiction of the GDPR
   * false - the user or Publisher is determined NOT to be within the
   * jurisdiction of the GDPR
   */
  public gdprApplies: boolean;

  /**
   * true - CMP main script is loaded
   * false - still running stub
   */
  public cmpLoaded: boolean;

  /**
   * see Ping Status Codes in following table
   */
  public cmpStatus: string;

  /**
   * see Ping Status Codes in following table
   */
  public displayStatus: string;

  /**
   * version of the CMP API that is supported; e.g. “2.0”
   */
  public apiVersion: string;

  /**
   * CMPs own/internal version that is currently running
   * undefined if still the stub
   */
  public cmpVersion: number;

  /**
   * IAB Assidned CMP ID
   * undefined if still the stub
   */
  public cmpId: number;

  /**
   * Version of the GVL currently loaded by the CMP
   * undefined if still the stub
   */
  public gvlVersion: number;

  /**
   * number of the supported TCF version
   * undefined if still the stub
   */
  public tcfPolicyVersion: number;

}
