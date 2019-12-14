package com.gdpr.phase2.Utils;

import com.gdpr.phase2.model.PurposeRestrictionVector;
import com.gdpr.phase2.model.SortedVector;

import java.util.Date;

/**
 * @Description
 * It is the replacement for the Java Reflection class to call the getters and Setters of the TCModel class
 */


public enum TCModelEnum {
    version(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getVersion();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setVersion((int)value);
        }
    },
    created() {
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getCreated();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setCreated((Date)value);
        }
    },
    lastUpdated() {
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getLastUpdated();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setLastUpdated((Date)value);
        }
    },
    cmpId(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getCmpId();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setCmpId((int)value);
        }
    },
    cmpVersion(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getCmpVersion();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setCmpVersion((int)value);
        }
    },
    consentScreen(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getConsentScreen();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setConsentScreen((int)value);
        }
    },
    consentLanguage(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getConsentLanguage();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setConsentLanguage((String)value);
        }
    },
    vendorListVersion(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getVendorListVersion();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setVendorListVersion((int)value);
        }
    },
    policyVersion(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getPolicyVersion();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setPolicyVersion((int)value);
        }
    },
    isServiceSpecific(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getServiceSpecific();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setServiceSpecific((Boolean) value);
        }
    },
    useNonStandardStacks(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getUseNonStandardStacks();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setUseNonStandardStacks((Boolean) value);
        }
    },
    publisherCountryCode(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getPublisherCountryCode();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setPublisherCountryCode((String) value);
        }
    },
    purposeOneTreatment(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getPurposeOneTreatment();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setPurposeOneTreatment((Boolean) value);
        }
    },
    specialFeatureOptIns(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getSpecialFeatureOptIns();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setSpecialFeatureOptIns((SortedVector) value);
        }
    },
    purposeConsents(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getPurposeConsents();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setPurposeConsents((SortedVector) value);
        }
    },
    purposeLegitimateInterest(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getPurposeLegitimateInterest();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setPurposeLegitimateInterest((SortedVector) value);
        }
    },
    vendorConsents(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getVendorConsents();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setVendorConsents((SortedVector) value);
        }
    },
    vendorLegitimateInterest(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getVendorLegitimateInterest();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setVendorLegitimateInterest((SortedVector) value);
        }
    },
    publisherRestrictions(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getPublisherRestrictions();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setPublisherRestrictions((PurposeRestrictionVector) value);
        }
    },
    vendorsAllowed(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getVendorsAllowed();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setVendorsAllowed((SortedVector)value);
        }
    },
    vendorsDisclosed(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getVendorsDisclosed();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setVendorsDisclosed((SortedVector)value);
        }
    },
    publisherConsents(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getPublisherConsents();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setPublisherConsents((SortedVector) value);
        }
    },
    publisherLegitimateInterest(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getPublisherLegitimateInterest();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setPublisherLegitimateInterest((SortedVector) value);
//            tcModel.publisherRestrictions = new SortedVector(0,(SortedSet<Integer>) value);
        }
    },
    publisherCustomConsents(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getPublisherCustomConsents();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setPublisherCustomConsents((SortedVector) value);
        }
    },
    publisherCustomLegitimateInterest(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getPublisherCustomLegitimateInterest();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setPublisherCustomLegitimateInterest((SortedVector) value);
        }
    },
    numCustomPurposes(){
        @Override
        public Object getValue(TCModel tcModel) {
            return tcModel.getNumCustomPurposes();
        }

        @Override
        public void setValue(TCModel tcModel, Object value) {
            tcModel.setNumCustomPurposes((Integer) value);
        }
    };

    public abstract Object getValue(TCModel tcModel);

    public abstract void setValue(TCModel tcModel, Object value);
}
