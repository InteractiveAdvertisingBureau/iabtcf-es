import {GVLMap} from './GVLMap';
import {Feature} from './Feature';
import {Purpose} from './Purpose';
import {Stack} from './Stack';


export interface GVLBase {
  gvlSpecificationVersion: number;
  vendorListVersion: number;
  tcfPolicyVersion: number;
  lastUpdated: string | Date;
  purposes: GVLMap<Purpose>;
  specialPurposes: GVLMap<Purpose>;
  features: GVLMap<Feature>;
  specialFeatures: GVLMap<Feature>;
  stacks: GVLMap<Stack>;
}
