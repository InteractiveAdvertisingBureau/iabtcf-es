<template>
  <b-container fluid>
    <PageHead title="Encode a TCString"></PageHead>
    <form>
      <b-card bg-variant="light" class="b-card">
        <textfield v-for="formField, i in formFields"
           :formField="formField"
           :tcModel="tcModel"
           :key='i'
        />
      </b-card>
      <b-card bg-variant="light" class="b-card">
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
      </b-card>
      <b-card bg-variant="light" class="b-card">
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
  </b-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PageHead from './PageHead.vue';
import {TCModel, GVL, TCString} from '@iabtcf/core';
import TextField from '../forms/TextField.vue';
import DateField from '../forms/DateField.vue';
import CheckboxBoolean from '../forms/CheckboxBoolean.vue';
import FormField from '../forms/FormField';

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
  private updateOrNo: {key: boolean} = {

    key: false,

  };
  private formFields: FormField[];

  public constructor() {

    super();

    this.tcString = new TCString();
    this.encodedTCString = '';
    this.formFields = [
      {
        label: 'CMP ID',
        identifier: 'cmpId',
        description: 'iab. assigned CMP ID',
      },
      {
        label: 'CMP Version',
        identifier: 'cmpVersion',
        description: 'Integer version of CMP (eg. 2)',
      },
      {
        label: 'TCF Policy Version',
        identifier: 'policyVersion',
        updater: this.updateOrNo,
      },
      {
        label: 'Vendor List Version',
        identifier: 'vendorListVersion',
        updater: this.updateOrNo,
      },
      {
        label: 'Consent Language',
        identifier: 'consentLanguage',
        description: 'Two-letter ISO639-1 Code',
        updater: this.updateOrNo,
      },
      {
        label: 'Consent Screen',
        identifier: 'consentScreen',
      },
      {
        label: 'Publisher Country Code',
        identifier: 'publisherCountryCode',
      },
    ];

    GVL.baseUrl = document.location.origin;
    this.tcModel = new TCModel(new GVL());
    this.tcModel.cmpVersion = 1 + Math.round(Math.random() * 40);
    this.tcModel.policyVersion = 2;
    this.tcModel.cmpId = 1 + Math.round(Math.random() * 100);
    this.tcModel.consentScreen = 1 + Math.round(Math.random() * 5);
    this.tcModel.publisherCountryCode = 'US';

    this.tcModel.gvl.readyPromise.then((): void => {

      this.encodeTCString();
      this.update();

    });

  }

  private render(): void {

    this.update();

  }

  private update(): void {

    this.updateOrNo.key = !this.updateOrNo.key;

  }
  private encodeTCString(): void {

    try {

      this.encodedTCString = this.tcString.encode(this.tcModel);

    } catch (err) {

      console.log(`error: ${err}`);

    }

  }

}
</script>
