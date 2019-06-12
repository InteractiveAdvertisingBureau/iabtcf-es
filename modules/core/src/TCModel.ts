import {Vector} from './Vector';
import {PurposeRestriction} from './PurposeRestriction';
import {GVL} from './GVL';
import {TCModelError} from './errors/TCModelError';

class TCModel {

  /**
   * Incremented when TC String format changes.
   */
  private _version: number;
  private _cmpId: number;
  private _cmpVersion: number;
  private _created: Date;
  private _lastUpdated: Date;
  private _consentScreen: number;
  private _consentLanguage: string;
  private _vendorListVersion: number;
  private _gvl: GVL;
  private _policyVersion: number;

  public isServiceSpecific: boolean = false;
  public useNonStandardStacks: boolean = false;

  public specialFeatureOptIns: Vector<boolean> = new Vector<boolean>();
  public purposeConsents: Vector<boolean> = new Vector<boolean>();
  public purposeLITransparency: Vector<boolean> = new Vector<boolean>();

  public vendorConsents: Vector<boolean> = new Vector<boolean>();
  public vendorLegitimateInterest: Vector<boolean> = new Vector<boolean>();
  public publisherRestrictions: Vector<PurposeRestriction> = new Vector<PurposeRestriction>();

  public constructor(gvl?: GVL) {

    if (gvl) {

      this.gvl = gvl;

    }

  }
  public set gvl(gvl: GVL) {

    if (this._gvl === undefined) {

      this._gvl = gvl;
      this._vendorListVersion = gvl.vendorListVersion;
      this._policyVersion = gvl.tcfPolicyVersion;

    } else {

      throw new TCModelError('gvl', gvl, 'can be set only once');

    }

  }
  public get gvl(): GVL {

    return this._gvl;

  }
  public set created(date: Date) {

    this._created = new Date(Math.round(date.getTime()/100));

  }
  public get created(): Date {

    return this._created;

  }
  public set lastUpdated(date: Date) {

    this._lastUpdated = new Date(Math.round(date.getTime()/100));

  }
  public get lastUpdated(): Date {

    return this._lastUpdated;

  }
  public set cmpId(integer: number) {

    if (this.isIntAbove(integer, 1)) {


      this._cmpId = integer;

    } else {

      throw new TCModelError('cmpId', integer);

    }

  }
  public get cmpId(): number {

    return this._cmpId;

  }
  public set cmpVersion(integer: number) {

    if (this.isIntAbove(integer, -1)) {

      this._cmpVersion = integer;

    } else {

      throw new TCModelError('cmpVersion', integer);

    }

  }
  public get cmpVersion(): number {

    return this._cmpVersion;

  }
  public set consentScreen(integer: number) {

    if (this.isIntAbove(integer, -1)) {

      this._consentScreen = integer;

    } else {

      throw new TCModelError('consentScreen', integer);

    }

  }
  public get consentScreen(): number {

    return this._consentScreen;

  }
  public set consentLanguage(lang: string) {

    const ASCII_START = 96;
    const ALPHABET_CARDINALITY = 26;
    const fieldName = 'consentLanguage';

    if (lang.length === 2) {

      const firstLetter: number = lang.charCodeAt(0) - ASCII_START;
      const secondLetter: number = lang.charCodeAt(1) - ASCII_START;

      if ((firstLetter <= ALPHABET_CARDINALITY && secondLetter <= ALPHABET_CARDINALITY)) {

        throw new TCModelError(fieldName, lang);

      }

    } else {

      throw new TCModelError(fieldName, lang);

    }

  }

  public get vendorListVersion(): number {

    return this._vendorListVersion;

  }
  public get policyVersion(): number {

    return this._policyVersion;

  }

  private isIntAbove(possibleInt: number, above: number): boolean {

    return (Number.isInteger(possibleInt) && possibleInt > above);

  }

}

export {TCModel};
