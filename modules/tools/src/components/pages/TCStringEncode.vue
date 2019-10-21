<template>
  <div>
    <PageHead title="Encode a TCString"></PageHead>
    <div>
      <H3>{{encodedTCString}}</H3>
    </div>
    <form>
      <b-card bg-variant="light" class="b-card">
        <textfield
           valueName="cmpId"
           label="CMP ID"
           description="iab. assigned CMP ID"
           :tcModel="tcModel"
        />
        <textfield
           valueName="cmpVersion"
           label="CMP Version"
           description="Integer version of CMP (eg. 2)"
           :tcModel="tcModel"
        />
        <textfield
           valueName="policyVersion"
           label="Policy Version"
           description="TCF Policy Version Number"
           :tcModel="tcModel"
        />
        <textfield
           valueName="vendorListVersion"
           label="VendorList Version"
           description="TC String GVL Version"
           :tcModel="tcModel"
        />
        <textfield
           valueName="consentLanguage"
           label="Consent Language"
           description="Two-letter ISO639-1 Code"
           :tcModel="tcModel"
        />
        <textfield
           valueName="consentScreen"
           label="Consent Screen"
           description="CMP Consent Screen"
           :tcModel="tcModel"
        />
        <textfield
           valueName="publisherCountryCode"
           label="Publisher Country Code"
           description="ISO 3166-1 alpha-2 code"
           :tcModel="tcModel"
        />
        <datefield
           valueName="created"
           label="Created Date"
           description="Date when this TC String was created"
           :tcModel="tcModel"
        />
        <datefield
           valueName="lastUpdated"
           label="Last Updated Date"
           description="Date when this TC String was last updated"
           :tcModel="tcModel"
        />
        <checkboxboolean
           valueName="isServiceSpecific"
           label="Is Service Specific"
           :tcModel="tcModel"
         />
        <checkboxboolean
           valueName="purposeOneTreatment"
           label="Purpose One Treatment"
           :tcModel="tcModel"
         />
        <checkboxboolean
           valueName="supportOOB"
           label="Support OOB Signaling"
           :tcModel="tcModel"
         />
        <checkboxboolean
           valueName="useNonStandardStacks"
           label="Publisher Uses Non-Standard Stacks"
           :tcModel="tcModel"
         />
      </b-card>
    </form>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PageHead from './PageHead.vue';
import {TCModel, GVL, TCString} from '@iabtcf/core';
import TextField from '../forms/TextField';
import DateField from '../forms/DateField';
import CheckboxBoolean from '../forms/CheckboxBoolean';

@Component({
  components: {
    PageHead,
    'textfield': TextField,
    'datefield': DateField,
    'checkboxboolean': CheckboxBoolean,
  },
})
export default class extends Vue {

  private tcModel: TCModel;
  private tcString: TCString;
  private encodedTCString: string;

  public constructor() {

    super();

    this.tcString = new TCString();
    this.encodedTCString = '';

    GVL.baseUrl = document.location.origin;
    this.tcModel = new TCModel(new GVL());
    this.tcModel.cmpVersion = 2;
    this.tcModel.policyVersion = 2;
    this.tcModel.cmpId = 23;
    this.tcModel.consentScreen = 1;
    this.tcModel.publisherCountryCode = 'US';

    this.tcModel.gvl.readyPromise.then((): void => {

      this.encodeTCString();

    });

  }

  private encodeTCString(): void {

    try {

      this.tcString = this.tcString.encode(this.tcModel);

    } catch (err) {

      console.log(`error: ${err}`);

    }

  }

}
</script>
