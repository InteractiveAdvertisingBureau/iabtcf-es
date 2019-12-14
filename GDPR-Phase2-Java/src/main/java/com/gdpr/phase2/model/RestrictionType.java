package com.gdpr.phase2.model;

public enum RestrictionType {

        /**
         * under no circumstances is this purpose allowed.
         */
        NOT_ALLOWED(0),

        /**
         * if the default declaration is legitimate interest then this flips the purpose to consent in the encoding.
         */
        REQUIRE_CONSENT(1),

        /**
         * if the default declaration is consent then this flips the purpose to Legitimate Interest in the encoding.
         */
        REQUIRE_LI(2);

        private int type;

        public int getType() {
            return type;
        }

        public void setType(int i) {
            this.type = i;
        }
//    public static int getRestrictionTypeById(int id) {
//
//        RestrictionType type = null;
//
//        switch (id) {
//            case 0:
//                type = NOT_ALLOWED;
//                break;
//            case 1:
//                type = REQUIRE_CONSENT;
//                break;
//            case 2:
//                type = REQUIRE_LI;
//                break;
//            default:
//                break;
//        }
//        return type.getType();
//    }
        RestrictionType(int i) {
                this.type = i;
        }
}
