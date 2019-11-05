import {IntMap} from '../IntMap';
import {Feature} from './Feature';
import {Purpose} from './Purpose';
import {Stack} from './Stack';

export interface Declarations {
  gvlSpecificationVersion: number;
  vendorListVersion: number;
  tcfPolicyVersion: number;
  lastUpdated: string | Date;
  purposes: IntMap<Purpose>;
  specialPurposes: IntMap<Purpose>;
  features: IntMap<Feature>;
  specialFeatures: IntMap<Feature>;
  stacks: IntMap<Stack>;
}
