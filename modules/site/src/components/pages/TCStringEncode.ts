import TextField from '../forms/TextField.vue';
import DateField from '../forms/DateField.vue';
import CheckboxBoolean from '../forms/CheckboxBoolean.vue';
import TCStringInput from '../forms/TCStringInput.vue';
import FormSelect from '../forms/FormSelect.vue';
import BigFormSelect from '../forms/BigFormSelect.vue';

import {Component, Vue} from 'vue-property-decorator';
import {TCModel, GVL, TCString, Vendor, Purpose, Feature, Json} from '@iabtcf/core';
import FormField from '../forms/FormField';
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

  private created(): void {
    this.tcModel.gvl = new GVL();
    this.listenForGVLChanges();
  }

  private listenForGVLChanges(): void {

    this.isReady = false;
    this.tcModel.gvl.readyPromise.then((): void => {

      const vendors = this.tcModel.gvl.vendors;

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

      this.isReady = true;

    });

  }

  private onVendorListSet(selectedVersion: number): void {

    if(selectedVersion) {

      this.listenForGVLChanges();

    }
  }
  private get languages(): FormField[] {

    return Array.from(this.tcModel.consentLanguages).map((lang: string): FormField => {

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

    const latest = this.tcModel.gvl.vendorListVersion;
    const retr:FormField[] = [];
    
    for(let i = 1; i <=latest; i++) {
      const str = i.toString();
      retr.push({
        value: str,
        text: str,
      });

    }

    return retr;

  }

}
