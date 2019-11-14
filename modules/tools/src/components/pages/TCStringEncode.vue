<template>
  <div>
    <form>
      <b-row>
        <b-col cols="12">
          <tc-string-input
            v-model=encodedTCString
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2">
          <b-card bg-variant="light" class="b-card">
            <form-select
              label="Vendor List Version"
               :tcModel="tcModel"
               :options="vendorListVersions"
               id="vendorListVersion"
               @update="onVendorListSet"
              />
            <template v-if="isReady">
              <text-field
                 v-for="formField in formFields"
                   :label="formField.text"
                   :tcModel="tcModel"
                   :id="formField.value"
                   :key="formField.value"
                   @update="update"
              />
              <form-select
                label="Consent Language"
                 :tcModel="tcModel"
                 :options="languages"
                 id="consentLanguage"
                 @update="update"
                />
              <form-select
                label="Pub Country Code"
                 :tcModel="tcModel"
                 :options="countries"
                 id="publisherCountryCode"
                 @update="update"
                />
            </template>
          </b-card>
        </b-col>

        <template v-if="isReady">
          <b-col cols="3">
            <b-card bg-variant="light" class="b-card">
              <date-field
                 id="created"
                 label="Created Date"
                 :tcModel="tcModel"
                 @update="update"
              />
              <date-field
                 id="lastUpdated"
                 label="Last Updated Date"
                 :tcModel="tcModel"
                 @update="update"
              />

              <checkbox-boolean
                 v-for="field in boolFields"
                   :id="field.value"
                   :label="field.text"
                   :tcModel="tcModel"
                   :key="field.value"
                   @update="update"
               />
              <br />
            </b-card>
          </b-col>

          <b-col cols="3">
            <b-card bg-variant="light" class="b-card">
              <big-form-select
                label="Vendor Consents"
                 :tcModel="tcModel"
                 :options="vendors"
                 id="vendorConsents"
                 @update="update"
                />
              <big-form-select
                label="Vendor Legitimate Interest"
                 :tcModel="tcModel"
                 :options="vendors"
                 id="vendorLegitimateInterest"
                 @update="update"
                />
              <big-form-select
                label="OOB Vendors Allowed"
                 :tcModel="tcModel"
                 :options="vendors"
                 id="vendorsAllowed"
                 @update="update"
                />
              <big-form-select
                label="OOB Vendors Disclosed"
                 :tcModel="tcModel"
                 :options="vendors"
                 id="vendorsDisclosed"
                 @update="update"
                />
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card bg-variant="light" class="b-card">
              <big-form-select
                label="Purpose Consents"
                 :tcModel="tcModel"
                 :options="purposes"
                 id="purposeConsents"
                 @update="update"
                />
              <big-form-select
                label="Purpose Legitimate Interest"
                 :tcModel="tcModel"
                 :options="purposes"
                 id="purposeConsents"
                 @update="update"
                />
              <big-form-select
                label="Special Feature Optins"
                 :tcModel="tcModel"
                 :options="specialFeatures"
                 id="specialFeatureOptIns"
                 @update="update"
                />
            </b-card>
          </b-col>
        </template>
      </b-row>
    </form>
  </div>
</template>

<script lang="ts" >
import {Component, Vue, Watch} from 'vue-property-decorator';
import {TCModel, GVL, TCString, Vendor, Purpose, Feature, ConsentLanguages} from '@iabtcf/core';
import TextField from '../forms/TextField.vue';
import DateField from '../forms/DateField.vue';
import CheckboxBoolean from '../forms/CheckboxBoolean.vue';
import TCStringInput from '../forms/TCStringInput.vue';
import FormField from '../forms/FormField';
import FormSelect from '../forms/FormSelect.vue';
import BigFormSelect from '../forms/BigFormSelect.vue';
import Countries from '../../model/Countries';

GVL.baseUrl = document.location.origin;

@Component({
  components: {
    'text-field': TextField,
    'date-field': DateField,
    'tc-string-input': TCStringInput,
    'checkbox-boolean': CheckboxBoolean,
    'form-select': FormSelect,
    'big-form-select': BigFormSelect,
  },
})
export default class extends Vue {

  private tcModel: TCModel = new TCModel();
  private consentLanguages: ConsentLanguages = new ConsentLanguages();
  private vendors_: FormField[] = [];
  private purposes_: FormField[] = [];
  private specialFeatures_: FormField[] = [];
  private encodedTCString: string = '';
  private formFields: FormField[] = [
    {value: 'cmpId', text: 'CMP ID'},
    {value: 'cmpVersion', text: 'CMP Version'},
    {value: 'policyVersion', text: 'TCF Policy Version'},
    {value: 'consentScreen', text: 'Consent Screen'},
  ];
  private boolFields: FormField[] = [
    {value: 'isServiceSpecific', text: 'Is Service Specific'},
    {value: 'purposeOneTreatment', text: 'Special Purpose One Treatment'},
    {value: 'supportOOB', text: 'Supports OOB'},
    {value: 'useNonStandardStacks', text: 'Publisher Uses Non-Standard Stacks'},
  ];
  private isReady: boolean = false;

  private listenForGVLChanges(): void {
    this.tcModel.gvl.readyPromise.then((): void => {

      const vendors = this.tcModel.gvl.vendors;

      this.tcModel.cmpVersion = 1 + Math.round(Math.random() * 40);
      this.tcModel.policyVersion = 2;
      this.tcModel.cmpId = 1 + Math.round(Math.random() * 100);
      this.tcModel.consentScreen = 1 + Math.round(Math.random() * 5);
      this.tcModel.publisherCountryCode = 'US';

      for (const id in vendors) {

        if (vendors.hasOwnProperty(id)) {

          const vendor: Vendor = vendors[id];

          this.vendors_.push({
            text: vendor.name,
            value: id,
          });

        }

      }

      const purposes = this.tcModel.gvl.purposes;

      for (const id in purposes) {

        if (purposes.hasOwnProperty(id)) {

          const purpose: Purpose = purposes[id];
          this.purposes_.push({
            text: purpose.name,
            value: id,
          });

        }

      }

      const specialFeatures = this.tcModel.gvl.specialFeatures;

      for (const id in specialFeatures) {

        if (specialFeatures.hasOwnProperty(id)) {

          const specialFeature: Feature = specialFeatures[id];
          this.specialFeatures_.push({
            text: specialFeature.name,
            value: id,
          });

        }

      }

      this.encodedTCString = TCString.encode(this.tcModel);

    });
  }

  private update(): void {

    try {

      this.encodedTCString = TCString.encode(this.tcModel);

    } catch (err) {

      this.encodedTCString = 'ERROR... ' + err;

    }

  }

  private onVendorListSet(selectedVersion: number): void {

    this.tcModel.vendorListVersion = selectedVersion;
    this.listenForGVLChanges();
    debugger;
    // this.update();
    // this.isReady = true;

  }
  private get languages(): FormField[] {

    return Array.from(this.consentLanguages).map((lang: string): FormField => {

      return {
        text: lang,
        value: lang,
      };

    });

  }
  private get countries(): FormField[] {

    return Countries.getFormFields();

  }
  private get vendors(): FormField[] {

    return this.vendors_;

  }
  private get purposes(): FormField[] {

    return this.purposes_;

  }
  private get specialFeatures(): FormField[] {

    return this.specialFeatures_;

  }
  private get vendorListVersions(): FormField[] {

    const numVersions = 7;
    const retr: FormField[] = [];

    for (let i = 0; i < numVersions; i ++) {

      const ver: string = (i+1).toString();
      const formField: FormField = {
        value: ver,
        text: ver,
      };
      retr.push(formField);

    }

    return retr;

  }

}
</script>
