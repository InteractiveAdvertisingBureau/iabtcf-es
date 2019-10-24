<template>
  <b-input-group >
    <b-form-group
      :id="formField.identifier"
      :description="formField.description || ''"
      :label="formField.label"
      :label-for="formField.identifier"
    >
    <b-form-input
      :id="formField.identifier"
      @input="changeValue"
      v-model="text"
      trim />
    </b-form-group>
  </b-input-group>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import FormField from './FormField';

@Component

export default class extends Vue {

  @Prop()
  public formField: FormField;
  @Prop()
  public value: string | number;

  private text: string | number = '';

  public constructor() {

    super();

    this.text = this.value;

  }

  private changeValue(newVal: boolean): void {

    this.$emit('update', newVal);

  }

}
</script>
