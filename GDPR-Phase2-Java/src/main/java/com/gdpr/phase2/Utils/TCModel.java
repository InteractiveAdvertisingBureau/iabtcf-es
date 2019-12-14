package com.gdpr.phase2.Utils;

import com.gdpr.phase2.model.ConsentLanguages;
import com.gdpr.phase2.model.PurposeRestrictionVector;
import com.gdpr.phase2.model.SortedVector;
import com.gdpr.phase2.model.gvl.Purpose;

import java.util.*;
import java.util.regex.Pattern;

public class TCModel {
    private static final int MAX_ENCODING_VERSION =2;
    private static Pattern p = Pattern.compile("[A-Z]{2}",Pattern.CASE_INSENSITIVE);
    private int version = TCModel.MAX_ENCODING_VERSION;
    private int consentScreen = 0;
    private int policyVersion = 2;
    private Boolean isServiceSpecific = false;
    private Boolean useNonStandardStacks = false;
    private Boolean purposeOneTreatment = false;
    private String publisherCountryCode = "AA";
    private Boolean supportOOB = false;
    private String consentLanguage = "EN";
    private int cmpId = 0;
    private int cmpVersion = 0;
    private int vendorListVersion = 0;

    private Date created;
    private Date lastUpdated;

    private GVL gvl;

    public SortedVector specialFeatureOptIns = new SortedVector();

    public SortedVector purposeConsents = new SortedVector();

    public SortedVector publisherConsents = new SortedVector();

    public SortedVector purposeLegitimateInterest = new SortedVector();

    public SortedVector publisherLegitimateInterest = new SortedVector();

    public Map<String,Purpose> customPurposes;

    public SortedVector publisherCustomConsents = new SortedVector();

    public SortedVector publisherCustomLegitimateInterest = new SortedVector();

    public SortedVector vendorConsents = new SortedVector();

    public SortedVector vendorLegitimateInterest = new SortedVector();

    public SortedVector vendorsDisclosed = new SortedVector();

    public SortedVector vendorsAllowed = new SortedVector();

    public PurposeRestrictionVector publisherRestrictions = new PurposeRestrictionVector();

    public ConsentLanguages consentLanguages = new ConsentLanguages();


    public TCModel(GVL gvl) {
        this.gvl = gvl;
        this.created = new Date();
        this.updated();
    }
    public TCModel(){
        this.created = new Date();
        this.updated();
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        if(version > 0 && version <=TCModel.MAX_ENCODING_VERSION) {
            this.version = version;
        } else {
            // throw error
        }

    }

    public int getConsentScreen() {
        return this.consentScreen;
    }

    public void setConsentScreen(int consentScreen) {
        if(consentScreen > -1) {
            this.consentScreen = consentScreen;
        } else {
            // throw error
        }
    }

    public int getPolicyVersion() {
        return policyVersion;
    }

    public void setPolicyVersion(int policyVersion) {
        this.policyVersion = policyVersion;
    }

    public Boolean getServiceSpecific() {
        return isServiceSpecific;
    }

    public void setServiceSpecific(Boolean serviceSpecific) {
        isServiceSpecific = serviceSpecific;
    }

    public Boolean getUseNonStandardStacks() {
        return useNonStandardStacks;
    }

    public void setUseNonStandardStacks(Boolean useNonStandardStacks) {
        this.useNonStandardStacks = useNonStandardStacks;
    }

    public Boolean getPurposeOneTreatment() {
        return purposeOneTreatment;
    }

    public void setPurposeOneTreatment(Boolean purposeOneTreatment) {
        this.purposeOneTreatment = purposeOneTreatment;
    }

    public String getPublisherCountryCode() {
        return this.publisherCountryCode;
    }

    public void setPublisherCountryCode(String countryCode) {
        if(p.matcher(countryCode).matches()) {
            this.publisherCountryCode = countryCode.toUpperCase();
        } else {
            // throw error
        }


    }

    public Boolean getSupportOOB() {
        return supportOOB;
    }

    public void setSupportOOB(Boolean supportOOB) {
        this.supportOOB = supportOOB;
    }

    public String getConsentLanguage() {
        return consentLanguage;
    }

    public void setConsentLanguage(String lang) {
        lang = lang.toUpperCase();
        if(this.consentLanguages.getLanguages().contains(lang)) {
            this.consentLanguage = lang;
            if(this.gvl!=null && GVL.baseUrl !=null && !GVL.baseUrl.isEmpty()) {
//                this.gvl.changeLanguage(lang);
            }
        } else {
            // throw error
        }

    }

    public int getCmpId() {
        return this.cmpId;
    }

    public void setCmpId(int cmpId) {
        if(cmpId>1) {
            this.cmpId = cmpId;
        } else {
            // throw error
        }
    }

    public int getCmpVersion() {
        return this.cmpVersion;
    }

    public void setCmpVersion(int cmpVersion) {
        if(cmpVersion > -1) {
            this.cmpVersion = cmpVersion;
        } else {
            //throw error
        }
    }

    public int getVendorListVersion() {
        return vendorListVersion;
    }

    public void setVendorListVersion(int vendorListVersion) {
        if(vendorListVersion > 0) {
            if(this.gvl==null) {
                this.vendorListVersion = vendorListVersion;
            }
        } else {
            // throw error
        }
    }

    public Date getCreated() {
        return this.created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getLastUpdated() {
        return this.lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public GVL getGvl() {
        return this.gvl;
    }

    public void setGvl(GVL gvl) {
        this.gvl = gvl;
        this.publisherRestrictions.setGvl(gvl);

        this.vendorListVersion = gvl.vendorListVersion;
        this.policyVersion = gvl.tcfPolicyVersion;
        this.consentLanguage = gvl.getLanguage();
    }

    public void updated() {
        this.lastUpdated = new Date();
    }

    /**
     * Sets all items on the vector
     *
     * @param {Map<String,T>} gvlMap
     * @param {Vector} vector - vector to affect
     * @return {void}
     */
    private void setAllOnVector(Map gvlMap, SortedVector vector) {
        if(this.gvl == null) {
            //throw error
        }
        gvlMap.forEach((key,value)->{
            vector.getSet().add((Integer) key);
        });
        vector.setBitLength(0);
    }

    /**
     * setAllVendorConsents - sets all vendors on the GVL Consent (true)
     *
     * @return {void}
     */
    public void setAllVendorConsents() {
        this.vendorConsents.getSet().clear();
        this.setAllOnVector(this.gvl.getGvlVendors(),this.vendorConsents);
    }

    /**
     * unsetAllVendorConsents - unsets all vendors on the GVL Consent (false)
     *
     * @return {void}
     */
    public void unsetAllVendorConsents() {
        this.vendorConsents.getSet().clear();
    }

    /**
     * setAllVendorsDisclosed - sets all vendors on the GVL Consent (true)
     *
     * @return {void}
     */
    public void setAllVendorsDisclosed() {
        this.vendorsDisclosed.getSet().clear();
        this.setAllOnVector(this.gvl.getGvlVendors(),this.vendorsDisclosed);
    }

    /**
     * unsetAllVendorsDisclosed - unsets all vendors on the GVL Consent (false)
     *
     * @return {void}
     */
    public void unsetAllVendorsDisclosed() {
        this.vendorsDisclosed.getSet().clear();
    }
    /**
     * setAllVendorLegitimateInterest - sets all vendors on the GVL LegitimateInterest (true)
     *
     * @return {void}
     */
    public void setAllVendorLegitimateInterest() {
        this.vendorLegitimateInterest.getSet().clear();
        this.setAllOnVector(this.gvl.getGvlVendors(),this.vendorLegitimateInterest);
    }
    /**
     * unsetAllVendorLegitimateInterest - unsets all vendors on the GVL LegitimateInterest (false)
     *
     * @return {void}
     */
    public void unsetAllVendorLegitimateInterest() {
        this.vendorLegitimateInterest.getSet().clear();
    }
    /**
     * setAllPurposeConsents - sets all purposes on the GVL Consent (true)
     *
     * @return {void}
     */
    public void setAllPurposeConsents(){
        this.purposeConsents.getSet().clear();
        this.setAllOnVector(this.gvl.getPurposes(),this.purposeConsents);
    }

    /**
     * unsetAllPurposeConsents - unsets all purposes on the GVL Consent (false)
     *
     * @return {void}
     */
    public void unsetAllPurposeConsents(){
        this.purposeConsents.getSet().clear();
    }

    /**
     * setAllPurposeLegitimateInterest - sets all purposes on the GVL LI Transparency (true)
     *
     * @return {void}
     */
    public void setAllPurposeLegitimateInterest(){
        this.purposeLegitimateInterest.getSet().clear();
        this.setAllOnVector(this.gvl.purposes,this.purposeLegitimateInterest);
    }

    /**
     * unsetAllPurposeLegitimateInterest - unsets all purposes on the GVL LI Transparency (false)
     *
     * @return {void}
     */
    public void unsetAllPurposeLegitimateInterest() {
        this.purposeLegitimateInterest.getSet().clear();
    }

    /**
     * setAllSpecialFeatureOptIns - sets all special featuresOptins on the GVL (true)
     *
     * @return {void}
     */
    public void setAllSpecialFeatureOptIns(){
        this.specialFeatureOptIns.getSet().clear();
        this.setAllOnVector(this.gvl.specialFeatures,this.specialFeatureOptIns);
    }

    /**
     * unsetAllSpecialFeatureOptIns - unsets all special featuresOptins on the GVL (true)
     *
     * @return {void}
     */
    public void unsetAllSpecialFeatureOptIns() {
        this.specialFeatureOptIns.getSet().clear();
    }

    public void setAll() {
        this.setAllVendorConsents();
        this.setAllPurposeLegitimateInterest();
        this.setAllSpecialFeatureOptIns();
        this.setAllPurposeConsents();
        this.setAllVendorLegitimateInterest();
        this.setAllVendorsDisclosed();
    }

    public void unSetAll() {
        this.unsetAllVendorConsents();
        this.unsetAllPurposeLegitimateInterest();
        this.unsetAllSpecialFeatureOptIns();
        this.unsetAllPurposeConsents();
        this.unsetAllVendorLegitimateInterest();
        this.unsetAllVendorsDisclosed();
    }

    public int getNumCustomPurposes() {
        int len=0;
        if(this.customPurposes!=null) {
            len = this.customPurposes.size();
        }
        return len;
    }

    public void setNumCustomPurposes(int num) {
        if(this.customPurposes==null) {
            this.customPurposes = new HashMap<>();
            for(int i=0; i < num; i++) {
                String id = String.valueOf(i+1);
                Purpose tempPurpose = new Purpose();
                tempPurpose.setId(i+1);
                tempPurpose.setName("publisher purpose " + id);
                tempPurpose.setDescription("publisher purpose description " + id);
                tempPurpose.setDescriptionLegal("publisher purpose legal description" + id);
                this.customPurposes.put(id,tempPurpose);
            }
        }
    }

    public SortedVector getSpecialFeatureOptIns() {
        return specialFeatureOptIns;
    }

    public SortedVector getPurposeConsents() {
        return purposeConsents;
    }

    public SortedVector getPurposeLegitimateInterest() {
        return purposeLegitimateInterest;
    }

    public SortedVector getVendorConsents() {
        return vendorConsents;
    }

    public SortedVector getVendorLegitimateInterest() {
        return vendorLegitimateInterest;
    }

    public PurposeRestrictionVector getPublisherRestrictions() {
        return publisherRestrictions;
    }

    public void setSpecialFeatureOptIns(SortedVector specialFeatureOptIns) {
        this.specialFeatureOptIns = specialFeatureOptIns;
    }

    public void setPurposeConsents(SortedVector purposeConsents) {
        this.purposeConsents = purposeConsents;
    }

    public void setPurposeLegitimateInterest(SortedVector purposeLegitimateInterest) {
        this.purposeLegitimateInterest = purposeLegitimateInterest;
    }

    public void setVendorConsents(SortedVector vendorConsents) {
        this.vendorConsents = vendorConsents;
    }

    public void setVendorLegitimateInterest(SortedVector vendorLegitimateInterest) {
        this.vendorLegitimateInterest = vendorLegitimateInterest;
    }

    public void setPublisherRestrictions(PurposeRestrictionVector publisherRestrictions) {
        this.publisherRestrictions = publisherRestrictions;
    }

    public SortedVector getVendorsDisclosed() {
        return vendorsDisclosed;
    }

    public void setVendorsDisclosed(SortedVector vendorsDisclosed) {
        this.vendorsDisclosed = vendorsDisclosed;
    }

    public SortedVector getVendorsAllowed() {
        return vendorsAllowed;
    }

    public void setVendorsAllowed(SortedVector vendorsAllowed) {
        this.vendorsAllowed = vendorsAllowed;
    }

    public SortedVector getPublisherConsents() {
        return publisherConsents;
    }

    public void setPublisherConsents(SortedVector publisherConsents) {
        this.publisherConsents = publisherConsents;
    }

    public SortedVector getPublisherLegitimateInterest() {
        return publisherLegitimateInterest;
    }

    public void setPublisherLegitimateInterest(SortedVector publisherLegitimateInterest) {
        this.publisherLegitimateInterest = publisherLegitimateInterest;
    }

    public SortedVector getPublisherCustomConsents() {
        return publisherCustomConsents;
    }

    public void setPublisherCustomConsents(SortedVector publisherCustomConsents) {
        this.publisherCustomConsents = publisherCustomConsents;
    }

    public SortedVector getPublisherCustomLegitimateInterest() {
        return publisherCustomLegitimateInterest;
    }

    public void setPublisherCustomLegitimateInterest(SortedVector publisherCustomLegitimateInterest) {
        this.publisherCustomLegitimateInterest = publisherCustomLegitimateInterest;
    }

    public Boolean isValid() {
        return (this.isServiceSpecific != null
                && this.useNonStandardStacks != null
                && this.cmpId != 0
                && this.cmpVersion != 0
                && this.consentLanguage != null
                && this.publisherCountryCode != null
                && this.purposeOneTreatment != null
                && this.consentScreen != 0
                && this.created != null
                && this.gvl != null
                && this.lastUpdated != null
                && (this.policyVersion == 1 || this.policyVersion == 2)
                && this.vendorListVersion != 0
                && (this.version == 2 || this.version == 1));
    }

}
