<template>
  <b-input-group >
    <b-form-group
      :label="label"
    >
    <b-form-select
      v-model="selected"
      :options="options"
      @input="changeValue"
      size="sm"
      class="mt-3" />
  </b-input-group>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';
import {FormField} from './FormField';

@Component

export default class extends FormComponent {

  @Prop
  public options: FormField[];

  private selected: string;

}
</script>
