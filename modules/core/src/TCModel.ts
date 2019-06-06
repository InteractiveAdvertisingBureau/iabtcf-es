import {CMPManifest} from './CMPManifest';
import {PurposeVector} from './PurposeVector';
import {VendorVector} from './VendorVector';
import {IsInt, IsDate, IsString} from 'class-validator';
import {IsIntWithinBits} from './IsIntWithinBits';
import {IsConsentLanguage} from './IsConsentLanguage';

import {GVL} from '@iabtcf/gvl';

class TCModel {

  public readonly version: number = 2;

  @IsDate()
  public created: Date;

  @IsDate()
  public readonly lastUpdated: Date;

  @IsInt()
  @IsIntWithinBits(6)
  public consentScreen: number;

  @IsString()
  @IsConsentLanguage()
  private consentLanguage: string;

  @IsInt()
  private vendorListVersion: number;
  private policyVersion: number;
  private isServiceSpecific: boolean;
  private useNonStandardStacks: boolean;
  private cmpManifest: CMPManifest;
  // private specialFeatureOptIns
  private purposeConsents: PurposeVector;
  private purposeLITransparency: PurposeVector;
  private vendorConsents: VendorVector;
  private vendorLegitimateInterest: VendorVector;
  private publisherRestrictions: VendorVector;

  public constructor(gvl?: GVL) {

    if (gvl) {
      // populate the model with information
    }

  }

}

export {TCModel};
