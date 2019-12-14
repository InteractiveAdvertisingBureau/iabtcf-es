package com.gdpr.phase2.Utils;

import com.gdpr.phase2.model.ConsentLanguages;
import com.gdpr.phase2.model.gvl.*;



import java.util.*;


enum PurposeOrFeature {
    Purpose(0),
    Feature(1);

    private int type = -1;

    PurposeOrFeature(int type) {
        this.type = type;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}

enum PurposeSubType {
    consent(0),
    legInt(1),
    flexible(2);

    private int type = -1;

    PurposeSubType(int type) {
        this.type = type;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}

/**
 * class with utilities for managing the global vendor list.  Will use JSON to
 * fetch the vendor list from specified url and will serialize it into this
 * object and provide accessors.  Provides ways to group vendors on the list by
 * purpose and feature.
 */

/**
 * @Usage
     * My Library is right now only implementing following cunstructor
         @Constructor GVL(GVL vendorList)
     * Promises are Ignored in the GVL loading for now

     * IntMap class has been removed in this Implementation for the proper and simple JSON parsing of GVL json
        Replaced by the Java.Utils.Map class
 */
public class GVL extends VendorList {
    private static Map<String, Declarations> LANGUAGE_CACHE = new HashMap<String, Declarations>();
    public static String DEFAULT_LANGUAGE = "EN";

    /**
     * @static
     * @param {string} - the base url to load the vendor-list.json from.  This is
     * broken out from the filename because it follows a different scheme for
     * latest file vs versioned files.
     */
    public static String baseUrl = "https://vendorlist.consensu.org/v2/";

    /**
     * @static
     * @param {string} - the latest is assumed to be vendor-list.json because
     * that is what the iab uses, but it could be different... if you want
     */
    public static String latestFilename = "vendor-list.json";

    /**
     * @static
     * @param {string} - the versioned name is assumed to be
     * vendor-list-v[VERSION].json where [VERSION] will be replaced with the
     * specified version.  But it could be different... if you want just make
     * sure to include the [VERSION] macro if you have a numbering scheme, it's a
     * simple string substitution.
     *
     * eg.
     * ```javascript
     * com.gdpr2.Utils.GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
     * com.gdpr2.Utils.GVL.versionedFilename = "vendorlist?getVersion=[VERSION]";
     * ```
     */
    public static String versionedFilename = "archives/vendor-list-v[VERSION].json";

    /**
     * @param {string} - Translations of the names and descriptions for Purposes,
     * Special Purposes, Features, and Special Features to non-English languages
     * are contained in a file where attributes containing English content
     * (except vendor declaration information) are translated.  The iab publishes
     * one following the scheme below where the LANG is the iso639-1 language
     * code.  For a list of available translations
     * [please go here](https://register.consensu.org/Translation).
     *
     * eg.
     * ```javascript
     * com.gdpr2.Utils.GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
     * com.gdpr2.Utils.GVL.languageFilename = "purposes?getPurposes=[LANG]";
     * ```
     */
    public static String languageFilename = "purposes-[LANG].json";

    /**
     * @param {Promise} resolved when this com.gdpr2.Utils.GVL object is populated with the data
     * or rejected if there is an error
     */
//    public Promise<ObjectUtils.Null> readyPromise;

    /**
     * @param {number} gvlSpecificationVersion - schema version for the com.gdpr2.Utils.GVL that is used
     */
    public int gvlSpecificationNumber;

    /**
     * @param {number} incremented with each published file change
     */
    public int vendorListVersion = -1;

    /**
     * @param {number} tcfPolicyVersion - The TCF MO will increment this value
     * whenever a com.gdpr2.Utils.GVL change (such as adding a new Purpose or Feature or a change
     * in Purpose wording) legally invalidates existing TC Strings and requires
     * CMPs to re-establish transparency and consent from users. If the policy
     * version number in the latest com.gdpr2.Utils.GVL is different from the value in your TC
     * String, then you need to re-establish transparency and consent for that
     * user. A version 1 format TC String is considered to have a version value
     * of 1.
     */
    public int tcfPolicyVersion;

    /**
     * @param { Date} lastUpdated - the date in which the vendor list
     * json file  was last updated.
     */
    public Date lastUpdated;

    /**
     * @param {Map<String,Purpose>} a collection of [[Purpose]]s
     */
    public Map<String,Purpose> purposes;

    /**
     * @param {Map<String,Purpose>} a collection of [[Purpose]]s
     */
    public Map<String, Purpose> specialPurposes;

    /**
     * @param {Map<String,Feature>} a collection of [[Feature]]s
     */
    public Map<String,Feature> features;

    /**
     * @param {Map<String,Feature>} a collection of [[Feature]]s
     */
    public Map<String,Feature> specialFeatures;

    /**
     * @param {Map<String,Vendor>} a collection of [[Vendor]]s
     */
    private Map<String, Vendor> gvlVendors;

    /**
     * @param {Map<String,Vendor>} a collection of [[Vendor]]. Used as a backup if a whitelist is sets
     */
    private Map<String,Vendor> fullVendorList;

    /**
     * @param {ByPurposeVendorMap} vendors by purpose
     */
    private Map<String,SetsOfLegalBases> byPurposeVendorMap;

    /**
     * @param {IDSetMap} vendors by special purpose
     */
    private Map<String, Set<Integer>> bySpecialPurposeVendorMap;

    /**
     * @param {Map<String, Set<Integer>>} vendors by feature
     */
    private Map<String, Set<Integer>> byFeatureVendorMap;

    /**
     * @param {Map<String, Set<Integer>>} vendors by special feature
     */
    private Map<String, Set<Integer>> bySpecialFeatureVendorMap ;

    /**
     * @param {Map<String,Stack>} a collection of [[Stack]]s
     */
    public Map<String, Stacks> stacks;

    private String lang;

    /**
     * Set of available consent languages published by the IAB
     */
    private ConsentLanguages consentLanguages  = new ConsentLanguages();

    /**
     * @param {VersionOrVendorList} [versionOrVendorList] - can be either a
     * [[VendorList]] object  or a version number represented as a string or
     * number to download.  If nothing is passed the latest version of the com.gdpr2.Utils.GVL
     * will be loaded
     */
//    public GVL(String version) {
//        String url = GVL.baseUrl;
//        this.lang = GVL.DEFAULT_LANGUAGE;
//
//        if(url == null || url.isEmpty()) {
//            //throw error
//        }
//        url  = this.addTrailingSlashMaybe(url);
//        if(Integer.parseInt(version) > 0) {
//            url += GVL.versionedFilename.replace("[VERSION]",version);
//            this.getJson(url);
//        }
////        this.readyPromise.succeeded();
//    }

    public GVL(GVL vendorList) {
        this.lang = GVL.DEFAULT_LANGUAGE;

        if(this.isVendorList(vendorList)) {
            this.deserialize(vendorList);
            this.cacheLanguage(GVL.DEFAULT_LANGUAGE);
        }
    }

    public GVL() {
//        String url = GVL.baseUrl;
//        this.lang = GVL.DEFAULT_LANGUAGE;
//        if(url == null || url.isEmpty()) {
//            //throw error
//        }
//        url  = this.addTrailingSlashMaybe(url);
//        url += GVL.latestFilename;
//        this.getJson(url);
//        //        this.readyPromise.succeeded();

    }

    /**
     * emptyLanguageCache
     *
     * @param {string} [lang] - Optional ISO 639-1 langauge code to remove from
     * the cache.  If a falsy value is passed it will empty the entire cache.
     * @return {boolean} - whether or not the item specified was in the cache and
     * subsequently removed
     */

    public Boolean emptyLanguageCache(String lang) {
        Boolean retr = false;

        if(lang!=null && !lang.isEmpty() && GVL.LANGUAGE_CACHE.containsKey(lang)) {
            GVL.LANGUAGE_CACHE.remove(lang);
            retr = true;
        } else {
            GVL.LANGUAGE_CACHE = new HashMap<String, Declarations>();
        }
        return retr;
    }

    private void cacheLanguage(String lang) {
        Declarations dec = new Declarations();
        dec.setGvlSpecificationVersion(this.gvlSpecificationNumber);
        dec.setVendorListVersion(this.vendorListVersion);
        dec.setTcfPolicyVersion(this.tcfPolicyVersion);
        dec.setLastUpdate(this.lastUpdated);
        dec.setPurposes(this.purposes);
        dec.setSpecialPurposes(this.specialPurposes);
        dec.setFeatures(this.features);
        dec.setSpecialFeatures(this.specialFeatures);
        dec.setStacks(this.stacks);
        GVL.LANGUAGE_CACHE.put(lang,dec);
    }

//    private Promise<ObjectUtils.Null> getJson(String url) {
////        this.readyPromise = new Promise()
//        return null;
//    }

//    public CompletableFuture<String> changeLanguage(String lang) {
//        lang = lang.toUpperCase();
//        String finalLang = lang;
//        CompletableFuture<String> stringCompletableFuture = CompletableFuture.supplyAsync(()->{
//                if(this.consentLanguages.getLanguages().contains(finalLang)) {
//                    if(!finalLang.equals(this.lang)) {
//                        if(com.gdpr2.Utils.GVL.LANGUAGE_CACHE.containsKey(finalLang)) {
//                            final Declarations cached = com.gdpr2.Utils.GVL.LANGUAGE_CACHE.get(finalLang);
//                            this.gvlSpecificationNumber = cached.getGvlSpecificationVersion();
//                            this.vendorListVersion = cached.getVendorListVersion();
//                            this.tcfPolicyVersion = cached.getTcfPolicyVersion();
//                            this.lastUpdated = cached.getLastUpdate();
//                            this.purposes = cached.getPurposes();
//                            this.specialPurposes = cached.getSpecialPurposes();
//                            this.features = cached.getFeatures();
//                            this.specialFeatures = cached.getSpecialFeatures();
//                            this.stacks = cached.getStacks();
//                        }
//                    }
//
//                }
//
//        }
//
//        });
//        return stringCompletableFuture;
//    }
    private String addTrailingSlashMaybe(String url) {
        if(url.charAt(url.length() - 1)!= '/') {
            url += '/';
        }
        return url;
    }

    public String getLanguage() {
        return this.lang;
    }

    private Boolean isVendorList(GVL gvlObject) {
        return gvlObject!=null && gvlObject.getVendors()!=null;
    }
    private void deserialize(GVL gvlObject) {
        this.gvlSpecificationNumber = gvlObject.gvlSpecificationNumber;
        this.vendorListVersion = gvlObject.vendorListVersion;
        this.tcfPolicyVersion = gvlObject.tcfPolicyVersion;
        this.lastUpdated = gvlObject.lastUpdated; // check here

        this.purposes = gvlObject.purposes;
        this.specialPurposes = gvlObject.specialPurposes;
        this.features = gvlObject.features;
        this.specialFeatures = gvlObject.specialFeatures;
        this.stacks = gvlObject.stacks;

        if(this.isVendorList(gvlObject)) {
            this.gvlVendors = gvlObject.getVendors();
            this.fullVendorList = gvlObject.getVendors();
            this.mapVendors();
        }
    }
    private void mapVendors() {
        this.byPurposeVendorMap = new HashMap<>();
        this.bySpecialPurposeVendorMap = new HashMap<>();
        this.byFeatureVendorMap = new HashMap<>();
        this.bySpecialFeatureVendorMap = new HashMap<>();

        // initializes data structure for purpose map
        this.purposes.entrySet().forEach(purposeEntry -> this.byPurposeVendorMap.put(purposeEntry.getKey(), new SetsOfLegalBases(new TreeSet<Integer>(), new TreeSet<Integer>(), new TreeSet<Integer>())));

        // initializes data structure for special purpose map
        this.specialPurposes.entrySet().forEach(specialPurposeEntry-> this.bySpecialPurposeVendorMap.put(specialPurposeEntry.getKey(), new TreeSet<Integer>()));

        // initializes data structure for feature map
        this.features.entrySet().forEach(featureEntry-> this.byFeatureVendorMap.put(featureEntry.getKey(), new TreeSet<Integer>()));

        // initializes data structure for special feature map
        this.specialFeatures.entrySet().forEach(specialFeatureEntry-> this.bySpecialFeatureVendorMap.put(specialFeatureEntry.getKey(), new TreeSet<Integer>()));

        // assigns vendor ids to their respective maps
        this.gvlVendors.entrySet().forEach(vendorEntry -> {
            int numVendorId = Integer.parseInt(vendorEntry.getKey(),10);
            List<Integer> purposes = vendorEntry.getValue().getPurposes();
            if(purposes!=null && !purposes.isEmpty()) {
                purposes.forEach(purposeId -> {
                    this.byPurposeVendorMap.get(String.valueOf(purposeId)).getConsent().add(numVendorId);
                });
            }
            List<Integer> specialPurposes = vendorEntry.getValue().getSpecialPurposes();
            if(specialPurposes!=null && !specialPurposes.isEmpty()) {
                specialPurposes.forEach(specialPurposesId -> {
                    this.bySpecialPurposeVendorMap.get(String.valueOf(specialPurposesId)).add(numVendorId);
                });
            }
            List<Integer> legIntPurposes = vendorEntry.getValue().getLegIntPurposes();
            if(legIntPurposes!=null && !legIntPurposes.isEmpty()) {
                legIntPurposes.forEach(legIntPurposesId -> {
                    this.byPurposeVendorMap.get(String.valueOf(legIntPurposesId)).getLegInt().add(numVendorId);
                });
            }
            List<Integer> flexiblePurposes = vendorEntry.getValue().getFlexiblePurposes();
            if(flexiblePurposes!=null && !flexiblePurposes.isEmpty()) {
                flexiblePurposes.forEach(flexiblePurposeId -> {
                    this.byPurposeVendorMap.get(String.valueOf(flexiblePurposeId)).getFlexible().add(numVendorId);
                });
            }
            List<Integer> features = vendorEntry.getValue().getFeatures();
            if(features!=null && !features.isEmpty()) {
                features.forEach(featureId -> {
                    this.byFeatureVendorMap.get(String.valueOf(featureId)).add(numVendorId);
                });
            }
            List<Integer> specialFeature = vendorEntry.getValue().getSpecialFeatures();
            if(specialFeature!=null && !specialFeature.isEmpty()) {
                specialFeature.forEach(specialFeatureId -> {
                    this.bySpecialFeatureVendorMap.get(String.valueOf(specialFeatureId)).add(numVendorId);
                });
            }
        });
    }

    private Map<String,Vendor> getFilteredVendors(PurposeOrFeature purposeOrFeature,int id,PurposeSubType subType,Boolean special) {
        Set<Integer> vendorSet = new TreeSet<Integer>();
        Map<String,Vendor> returnMap = new HashMap<>();

        if(purposeOrFeature.getType() == 0){
            switch (subType.getType()) {
                case 0:
                    vendorSet = this.byPurposeVendorMap.get(String.valueOf(id)).getConsent();
                    break;

                case 1:
                    vendorSet = this.byPurposeVendorMap.get(String.valueOf(id)).getLegInt();
                    break;

                case 2:
                    vendorSet = this.byPurposeVendorMap.get(String.valueOf(id)).getFlexible();
                    break;

                case -1:
                    vendorSet = this.bySpecialPurposeVendorMap.get(String.valueOf(id));

            }
        } else  {
            if(special) {
                vendorSet = this.bySpecialFeatureVendorMap.get(String.valueOf(id));
            } else {
                vendorSet = this.byFeatureVendorMap.get(String.valueOf(id));
            }
        }
        vendorSet.forEach(vendorId -> {
            returnMap.put(String.valueOf(vendorId),this.gvlVendors.get(String.valueOf(vendorId)));
        });
        return returnMap;
    }

    /**
     * getVendorsWithConsentPurpose
     *
     * @param {number} purposeId
     * @return {Map<String,Vendor>} - list of vendors that have declared the consent purpose id
     */
    public Map<String,Vendor> getVendorsWithConsentPurpose(int purposeId) {
        return this.getFilteredVendors(PurposeOrFeature.Purpose,purposeId,PurposeSubType.consent,false);
    }

    /**
     * getVendorsWithLegIntPurpose
     *
     * @param {number} purposeId
     * @return {Map<String,Vendor>} - list of vendors that have declared the legInt (Legitimate Interest) purpose id
     */
    public Map<String,Vendor> getVendorsWithLegIntPurpose(int purposeId) {
        return this.getFilteredVendors(PurposeOrFeature.Purpose,purposeId,PurposeSubType.legInt,false);
    }

    /**
     * getVendorsWithFlexiblePurpose
     *
     * @param {number} purposeId
     * @return {Map<String,Vendor>} - list of vendors that have declared the flexible purpose id
     */
    public Map<String,Vendor> getVendorsWithFlexiblePurpose(int purposeId) {
        return this.getFilteredVendors(PurposeOrFeature.Purpose,purposeId,PurposeSubType.flexible,false);
    }

    /**
     * getVendorsWithSpecialPurpose
     *
     * @param {number} specialPurposeId
     * @return {Map<String,Vendor>} - list of vendors that have declared the special purpose id
     */
    public Map<String,Vendor> getVendorsWithSpecialPurpose(int specialPurposeId) {
        return this.getFilteredVendors(PurposeOrFeature.Purpose,specialPurposeId,null,true);
    }

    /**
     * getVendorsWithFeature
     *
     * @param {number} featureId
     * @return {Map<String,Vendor>} - list of vendors that have declared the feature id
     */
    public Map<String,Vendor> getVendorsWithFeature(int featureId) {
        return this.getFilteredVendors(PurposeOrFeature.Feature,featureId,null,false);
    }

    /**
     * getVendorsWithSpecialFeature
     *
     * @param {number} specialFeatureId
     * @return {Map<String,Vendor>} - list of vendors that have declared the special feature id
     */
    public Map<String,Vendor> getVendorsWithSpecialFeature(int specialFeatureId) {
        return this.getFilteredVendors(PurposeOrFeature.Feature,specialFeatureId,null,true);
    }

    public Map<String,Vendor> getGvlVendors() {
        return this.gvlVendors;
    }

    public Map<String,Purpose> getPurposes() {
        return this.purposes;
    }

    /**
     * narrowVendorsTo - narrows vendors represented in this Utils.GVL to the list of ids passed in
     *
     * @param {number[]} vendorIds - list of ids to narrow this Utils.GVL to
     * @return {void}
     */
    public void narrowVendorsTo(List<Integer> vendorIds) {
        this.gvlVendors = new HashMap<>();
        Map<String,Vendor> tempMap = new HashMap<>();
        vendorIds.forEach(id -> {
            Vendor tempVendor = this.fullVendorList.get(String.valueOf(id));
            if(tempVendor!=null){
                tempMap.put(String.valueOf(id),tempVendor);
            }
        });
        this.gvlVendors = (tempMap);
        this.mapVendors();
    }


}
