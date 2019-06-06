import {PurposeVector} from './PurposeVector';
import {VendorVector} from './VendorVector';
import {IsInt, IsDate, IsString, IsBoolean, Min} from 'class-validator';
import {IsConsentLanguage} from './validators/IsConsentLanguage';

import {GVL} from './GVL';

class TCModel {

  public version: number;

  @IsInt()
  @Min(2)
  public cmpId: number;

  @IsInt()
  @Min(1)
  public cmpVersion: number;

  @IsDate()
  public created: Date;

  @IsDate()
  public readonly lastUpdated: Date;

  @IsInt()
  public consentScreen: number;

  @IsString()
  @IsConsentLanguage()
  public consentLanguage: string;

  @IsInt()
  public vendorListVersion: number;

  public policyVersion: number;

  @IsBoolean()
  public isServiceSpecific: boolean;

  @IsBoolean()
  public useNonStandardStacks: boolean;

  // public specialFeatureOptIns
  public purposeConsents: PurposeVector;
  public purposeLITransparency: PurposeVector;

  public vendorConsents: VendorVector;
  public vendorLegitimateInterest: VendorVector;
  public publisherRestrictions: VendorVector;

  public constructor(gvl?: GVL) {

    if (gvl) {
      // populate the model with information
    }

  }

}

export {TCModel};
