import {GVLMapItem} from './GVLMapItem';

export interface Stack extends GVLMapItem {
  purposes: number[];
  specialPurposes: number[];
  description: string;
}
