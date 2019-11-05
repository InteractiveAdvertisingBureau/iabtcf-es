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
      multiple
      :select-size="size"
      @input="changeValue"
      class="mt-3"
    />

    </b-form-group>
  </b-input-group>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';
import FormField from './FormField';

@Component

export default class extends FormComponent {

  private readonly MAX_SIZE: number = 10;

  @Prop()
  public options: FormField[];

  private selected: string[] = [];
  private size: number = 0;

  private mounted(): void {

    this.size = Math.min(this.options.length, 10);

  }

}
</script>
