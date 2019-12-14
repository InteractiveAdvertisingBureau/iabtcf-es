package com.gdpr.phase2.model;

import com.gdpr.phase2.model.gvl.Vendor;
import com.gdpr.phase2.Utils.GVL;
import lombok.*;

import java.util.*;

@Getter @Setter
public class PurposeRestrictionVector {
    public int bitLength = 0;
    private Map<String,TreeSet<Integer>> map = new HashMap<String, TreeSet<Integer>>();
    private GVL gvl;

    private Boolean isOkToHave(RestrictionType restrictionType,int purposeId,int vendorId) {
        if(this.gvl!=null) {
            if(this.gvl.getGvlVendors()!=null && this.gvl.getGvlVendors().get(String.valueOf(vendorId))!=null) {
                Vendor vendor = this.gvl.getGvlVendors().get(String.valueOf(vendorId));
                if(vendor.getFlexiblePurposes()!=null && vendor.getFlexiblePurposes().size()>0) {
                    switch (restrictionType.getType()) {
                        case 0:
                            return (vendor.getLegIntPurposes().contains(purposeId) || vendor.getPurposes().contains(purposeId));
                        case 1:
                            return (vendor.getFlexiblePurposes().contains(purposeId) && vendor.getLegIntPurposes().contains(purposeId));
                        case 2:
                            return (vendor.getLegIntPurposes().contains(purposeId) && vendor.getPurposes().contains(purposeId));

                    }
                    return false;
                } else if(restrictionType.getType() == 0) {
                    return (vendor.getLegIntPurposes().contains(purposeId) || vendor.getPurposes().contains(purposeId));
                }
            } else {
                return false;
            }
        }
        return true;
    }

    public void add(int vendorId,PurposeRestriction purposeRestriction) {
        if(this.isOkToHave(purposeRestriction.restrictionType,purposeRestriction.getPurposeId(),vendorId)) {
            String hash = purposeRestriction.getHash();
            if(!this.getMap().containsKey(hash)) {
                this.getMap().put(hash,new TreeSet<Integer>());
                this.bitLength = 0;
            }
            this.getMap().get(hash).add(vendorId);
        }
    }

    public List<Integer> getVendors(PurposeRestriction purposeRestriction) {
        String hash = purposeRestriction.getHash();
        if(this.getMap().containsKey(hash)) {
            List<Integer> list = new ArrayList<>(this.getMap().get(hash));
            return list;
        } else {
            return new ArrayList<>();
        }
    }

    public List<PurposeRestriction> getRestriction(int vendorId) {
        List<PurposeRestriction> list = new ArrayList<>();
        this.map.forEach((hash,bst) -> {
            if(bst.contains(vendorId)) {
                list.add(PurposeRestriction.unHash(hash));
            }
        });
        return list;
    }

    public List<PurposeRestriction> getAllRestriction(int vendorId) {
        List<PurposeRestriction> list = new ArrayList<>();
        this.map.forEach((hash,bst) -> {
            list.add(PurposeRestriction.unHash(hash));
        });
        return list;
    }

    public void remove(int vendorId,PurposeRestriction purposeRestriction) {
        String hash = purposeRestriction.getHash();
        TreeSet bst = this.map.get(hash);
        if(bst!=null) {
            bst.remove(vendorId);
            if(bst.isEmpty()) {
                this.map.remove(hash);
                this.bitLength = 0;
            }
        }
    }

    /**
     * Essential for being able to determine whether we can actually set a
     * purpose restriction since they have to have a flexible legal basis
     *
     * @param {GVL} value - the GVL instance
     */
    public void setGvl(GVL value) {
        if(this.gvl== null) {
            this.gvl = value;

            /**
             * if we have restrictions set before the gvl is set then we'll have to
             * go through and remove some if they're not valid
             */
            if(this.getNumRestrictions()>0) {
                this.map.forEach((hash,bst)-> {
                    PurposeRestriction purposeRestriction = PurposeRestriction.unHash(hash);
                    List<Integer> vendors = new ArrayList<>(bst);
                    vendors.forEach(vendorId -> {
                        if(!this.isOkToHave(purposeRestriction.restrictionType,purposeRestriction.getPurposeId(),vendorId)) {
                            bst.remove(vendorId);
                        }
                    });
                });
            }
        }
    }
    public GVL getGVL() {
        return this.gvl;
    }
    public Boolean isValid() {
        return this.gvl != null;
    }
    public int getNumRestrictions() {
        return this.map.size();
    }
}
