<template>
  <b-container fluid>
    <PageHead title="Encode a TCString"></PageHead>
    <form>
      <tcstringinput
        v-model=encodedTCString
      />
      <b-card bg-variant="light" class="b-card">
        <textfield
           v-for="formField in formFields"
             :label="formField.text"
             :tcModel="tcModel"
             :id="formField.value"
             :key="formField.value"
             @update="update"
        />
      </b-card>

      <b-card bg-variant="light" class="b-card">
        <datefield
           valueName="created"
           label="Created Date"
           description="Date when this TC String was created"
           :tcModel="tcModel"
           v-on:update="update"
        />
        <datefield
           valueName="lastUpdated"
           label="Last Updated Date"
           description="Date when this TC String was last updated"
           :tcModel="tcModel"
           v-on:update="update"
        />

        <checkboxboolean
           v-for="field in boolFields"
             :id="field.value"
             :label="field.text"
             :tcModel="tcModel"
             :key="field.value"
             @update="update"
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
import TCStringInput from '../forms/TCStringInput.vue';
import FormField from '../forms/FormField';

@Component({
  components: {
    PageHead,
    'textfield': TextField,
    'datefield': DateField,
    'tcstringinput': TCStringInput,
    'checkboxboolean': CheckboxBoolean,
  },
})
export default class extends Vue {

  private tcModel: TCModel;
  private tcString: TCString;
  private encodedTCString: string = '';
  private formFields: FormField[] = [
    {value: 'cmpId', text: 'CMP ID'},
    {value: 'cmpVersion', text: 'CMP Version'},
    {value: 'policyVersion', text: 'TCF Policy Version'},
    {value: 'vendorListVersion', text: 'Vendor List Version'},
    {value: 'consentScreen', text: 'Consent Screen'},
    {value: 'consentLanguage', text: 'Consent Language'},
    {value: 'publisherCountryCode', text: 'Publisher Country Code'},
  ];
  private boolFields: FormField[] = [
    {value: 'isServiceSpecific', text: 'Is Service Specific'},
    {value: 'purposeOneTreatment', text: 'Special Purpose One Treatment'},
    {value: 'supportOOB', text: 'Supports OOB'},
    {value: 'useNonStandardStacks', text: 'Publisher Uses Non-Standard Stacks'},
  ];

  public constructor() {

    super();

    this.tcString = new TCString();

    GVL.baseUrl = document.location.origin;
    this.tcModel = new TCModel(new GVL());
    this.tcModel.cmpVersion = 1 + Math.round(Math.random() * 40);
    this.tcModel.policyVersion = 2;
    this.tcModel.cmpId = 1 + Math.round(Math.random() * 100);
    this.tcModel.consentScreen = 1 + Math.round(Math.random() * 5);
    this.tcModel.publisherCountryCode = 'US';

  }

  private mounted(): void {

    this.tcModel.gvl.readyPromise.then((): void => {

      this.encodedTCString = this.tcString.encode(this.tcModel);

    });

  }

  private update(): void {

    try {

      this.encodedTCString = this.tcString.encode(this.tcModel);

    } catch (err) {

      this.encodedTCString = 'ERROR... ' + err;

    }

  }

  private get languages(): FormField[] {

    return [{value: 'BG', text: 'BG'}, {value: 'CS', text: 'CS'}, {value: 'DA', text: 'DA'}, {value: 'DE', text: 'DE'}, {value: 'EL', text: 'EL'}, {value: 'ES', text: 'ES'}, {value: 'ET', text: 'ET'}, {value: 'FI', text: 'FI'}, {value: 'FR', text: 'FR'}, {value: 'GA', text: 'GA'}, {value: 'HR', text: 'HR'}, {value: 'HU', text: 'HU'}, {value: 'IT', text: 'IT'}, {value: 'LT', text: 'LT'}, {value: 'LV', text: 'LV'}, {value: 'MT', text: 'MT'}, {value: 'NL', text: 'NL'}, {value: 'PL', text: 'PL'}, {value: 'PT', text: 'PT'}, {value: 'RO', text: 'RO'}, {value: 'SK', text: 'SK'}, {value: 'SL', text: 'SL'}, {value: 'SV', text: 'SV'}];

  }
  private get countries(): FormField[] {

    return [];

  }

}
</script>
