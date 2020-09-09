import {IntMap} from '../IntMap';
import {Feature} from './Feature';
import {Purpose} from './Purpose';
import {Stack} from './Stack';
import {Declaration} from './Declaration';

export interface DeclarationMap {
  [Declaration.features]: IntMap<Feature>;
  [Declaration.purposes]: IntMap<Purpose>;
  [Declaration.specialFeatures]: IntMap<Feature>;
  [Declaration.specialPurposes]: IntMap<Purpose>;
  [Declaration.stacks]: IntMap<Stack>;
}
