import {GVLMapItem} from './GVLMapItem';

export interface Stack extends GVLMapItem {
  purposes: number[];
  specialFeatures: number[];
  description: string;
}
