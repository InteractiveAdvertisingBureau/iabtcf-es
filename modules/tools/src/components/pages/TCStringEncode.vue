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
             :formField="formField"
             :value="tcModel[formField.identifier]"
             :key="formField.identifier"
             @update="update(formField.identifier, $event)"
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
             :valueName="field.fieldName"
             :label="field.label"
             v-model="tcModel[field.fieldName]"
             :key="field.fieldName"
             @update="update(field.fieldName, $event)"
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
  private formFields: FormField[];
  private encodedTCString: string;
  private boolFields: {fieldName: string; label: string}[] = [
    {fieldName: 'isServiceSpecific', label: 'Is Service Specific'},
    {fieldName: 'purposeOneTreatment', label: 'Special Purpose One Treatment'},
    {fieldName: 'supportOOB', label: 'Supports OOB'},
    {fieldName: 'useNonStandardStacks', label: 'Publisher Uses Non-Standard Stacks'},
  ];

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
      },
      {
        label: 'Vendor List Version',
        identifier: 'vendorListVersion',
      },
      {
        label: 'Consent Language',
        identifier: 'consentLanguage',
        description: 'Two-letter ISO639-1 Code',
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

    });

  }

  private update(fieldName: string, value: string | boolean | number): void {

    try {

      this.tcModel[fieldName] = value;
      this.encodedTCString = this.tcString.encode(this.tcModel);

    } catch (err) {

      this.encodedTCString = 'ERROR... ' + err;

    }

  }

}
</script>
