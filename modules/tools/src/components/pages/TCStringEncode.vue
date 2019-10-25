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

    return [{'BG': 'BG'}, {'CS': 'CS'}, {'DA': 'DA'}, {'DE': 'DE'}, {'EL': 'EL'}, {'ES': 'ES'}, {'ET': 'ET'}, {'FI': 'FI'}, {'FR': 'FR'}, {'GA': 'GA'}, {'HR': 'HR'}, {'HU': 'HU'}, {'IT': 'IT'}, {'LT': 'LT'}, {'LV': 'LV'}, {'MT': 'MT'}, {'NL': 'NL'}, {'PL': 'PL'}, {'PT': 'PT'}, {'RO': 'RO'}, {'SK': 'SK'}, {'SL': 'SL'}, {'SV': 'SV'}];

  }
  private get countries(): FormField[] {

    return {
    };

  }

}
</script>
