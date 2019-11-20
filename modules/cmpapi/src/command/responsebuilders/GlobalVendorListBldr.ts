import {Feature, GVL, IntMap, Purpose, Stack, Vendor} from '@iabtcf/core';
import {GlobalVendorList} from '../../model';
import {ResponseBuilder} from './ResponseBuilder';

/**
 * GlobalVendorList response builder
 */
export class GlobalVendorListBldr extends ResponseBuilder implements GlobalVendorList {

  public gvlSpecificationVersion: number;
  public vendorListVersion: number;
  public lastUpdated: string | Date;
  public purposes: IntMap<Purpose>;
  public specialPurposes: IntMap<Purpose>;
  public features: IntMap<Feature>;
  public specialFeatures: IntMap<Feature>;
  public vendors: IntMap<Vendor>;
  public stacks: IntMap<Stack>;

  public constructor(gvl: GVL) {

    super();

    this.gvlSpecificationVersion = gvl.gvlSpecificationVersion;
    this.vendorListVersion = gvl.vendorListVersion;
    this.lastUpdated = gvl.lastUpdated;
    this.purposes = gvl.purposes;
    this.specialPurposes = gvl.specialPurposes;
    this.features = gvl.features;
    this.specialFeatures = gvl.specialFeatures;
    this.vendors = gvl.vendors;
    this.stacks = gvl.stacks;

  }

}
