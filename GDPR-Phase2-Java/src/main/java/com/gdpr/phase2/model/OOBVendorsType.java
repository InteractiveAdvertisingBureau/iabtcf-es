package com.gdpr.phase2.model;

public enum OOBVendorsType {

        Disclosed("VendorsDisclosed"),


        Allowed("VendorsAllowed");

        private String name;

        public String getName() {
            return name;
        }

        OOBVendorsType(String i) {
                this.name = i;
        }
}
