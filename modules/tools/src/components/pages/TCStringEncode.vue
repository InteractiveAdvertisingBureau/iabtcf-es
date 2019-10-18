<template>
  <div>
    <PageHead title="Encode a TCString"></PageHead>
    <form>

      <b-card bg-variant="light">
          <b-input-group >
            <b-form-group
              id="cmpId"
              description="iab. assigned CMP ID"
              label="CMP ID"
              label-for="cmpId"
            >
              <b-form-input id="cmpId" v-model="tcModel.cmpId" trim></b-form-input>
            </b-form-group>
          </b-input-group>

          <b-input-group >
            <b-form-group
              id="cmpVersion"
              description="Integer version of CMP (eg. 2)"
              label="CMP Version"
              label-for="cmpVersion"
            >
              <b-form-input id="cmpVersion" v-model="tcModel.cmpVersion" trim></b-form-input>
            </b-form-group>
          </b-input-group>

          <b-input-group >
            <b-form-group
              id="policyVersion"
              description="IAB TCF Policy Number"
              label="Policy Version"
              label-for="policyVersion"
            >
              <b-form-input id="policyVersion" v-model="tcModel.policyVersion" trim></b-form-input>
            </b-form-group>
          </b-input-group>

          <b-input-group >
            <b-form-group
              id="vendorListVersion"
              description="TC String GVL Version"
              label="VendorList Version"
              label-for="vendorListVersion"
            >
              <b-form-input id="vendorListVersion" v-model="tcModel.vendorListVersion" trim></b-form-input>
            </b-form-group>
          </b-input-group>


          <b-input-group >
            <b-form-group
              id="consentLanguage"
              description="Two-letter ISO639-1 Code"
              label="Consent Language"
              label-for="consentLanguage"
            >
              <b-form-input id="consentLanguage" v-model="tcModel.consentLanguage" trim></b-form-input>
            </b-form-group>
          </b-input-group>

          <b-input-group >
            <b-form-group
              id="consentScreen"
              description="CMP Consent Screen"
              label="Consent Screen"
              label-for="consentScreen"
            >
              <b-form-input id="consentScreen" v-model="tcModel.consentScreen" trim></b-form-input>
            </b-form-group>
          </b-input-group>

          <b-input-group >
            <b-form-group
              id="created"
              description="Date when this TC String was created"
              label="Created Date"
              label-for="created"
            >
              <datepicker v-model="tcModel.created" />
            </b-form-group>
          </b-input-group>

          <b-input-group >
            <b-form-group
              id="created"
              description="Date when this TC String was created"
              label="Created Date"
              label-for="created"
            >
              <datepicker v-model="tcModel.lastUpdated" />
            </b-form-group>
          </b-input-group>

          <b-input-group >
            <b-form-group
              id="publisherCountryCode"
              description="ISO 3166-1 alpha-2 code"
              label="Publisher Country Code"
              label-for="publisherCountryCode"
            >
              <b-form-input id="publisherCountryCode" v-model="tcModel.publisherCountryCode" trim></b-form-input>
            </b-form-group>
          </b-input-group>

          <b-input-group >
            <b-form-checkbox
              id="isServiceSpecific"
              v-model="tcModel.isServiceSpecific"
              name="isServiceSpecific"
              value=true
              unchecked-value=false
            >
            Is Service Specific
            </b-form-checkbox>
          </b-input-group>

          <b-input-group >
            <b-form-checkbox
              id="purposeOneTreatment"
              v-model="tcModel.purposeOneTreatment"
              name="purposeOneTreatment"
              value=true
              unchecked-value=false
            >
            Special Purpose One Treatment
            </b-form-checkbox>
          </b-input-group>

          <b-input-group >
            <b-form-checkbox
              id="supportOOB"
              v-model="tcModel.supportOOB"
              name="supportOOB"
              value=true
              unchecked-value=false
            >
            Support OOB Signaling
            </b-form-checkbox>
          </b-input-group>

          <b-input-group >
            <b-form-checkbox
              id="useNonStandardStacks"
              v-model="tcModel.useNonStandardStacks"
              name="useNonStandardStacks"
              value=true
              unchecked-value=false
            >
            Publisher Uses Non-Standard Stacks
            </b-form-checkbox>
          </b-input-group>

      </b-card>
    </form>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PageHead from './PageHead.vue';
import {TCModel, GVL} from '@iabtcf/core';
import DatePicker from 'vuejs-datepicker';

@Component({
  components: {
    PageHead,
    'datepicker': DatePicker,
  },
})
export default class TCStringEncode extends Vue {

  public tcModel: TCModel;

  public constructor() {

    super();

    GVL.baseUrl = document.location.origin;
    this.tcModel = new TCModel(new GVL());
    this.tcModel.cmpVersion = 2;
    this.tcModel.policyVersion = 2;
    this.tcModel.cmpId = 23;
    this.tcModel.consentScreen = 1;
    this.tcModel.publisherCountryCode = 'US';

  }

}
</script>
