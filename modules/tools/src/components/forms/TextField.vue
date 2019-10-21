<template>
  <b-input-group >
    <b-form-group
      :id="formField.valueName"
      :description="formField.description || ''"
      :label="formField.label"
      :label-for="formField.valueName"
    >
    <b-form-input :id="formField.valueName" v-model="tcModel[formField.valueName]" trim></b-form-input>
    </b-form-group>
  </b-input-group>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {TCModel} from '@iabtcf/core';
import FormField from './FormField';

@Component

export default class extends Vue {

  @Prop()
  public formField: FormField;
  @Prop()
  public tcModel: TCModel;

  public constructor() {

    super();

  }

}
</script>
