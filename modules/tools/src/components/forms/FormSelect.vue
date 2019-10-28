<template>
  <b-input-group >
    <b-form-group
      :label-for="id"
      :label="label"
    >
    <b-form-select
      id="id"
      v-model="selected"
      :options="options"
      @input="changeValue"
      class="mt-3" />

    </b-form-group>
  </b-input-group>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';
import FormField from './FormField';

@Component

export default class extends FormComponent {

  @Prop()
  public options: FormField[];

  private selected: string = '';

  public mounted(): void {

    this.selected = this.tcModel[this.id];

  }

}
</script>
