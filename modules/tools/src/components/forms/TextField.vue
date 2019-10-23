<template>
  <b-input-group >
    <b-form-group
      :id="formField.identifier"
      :description="formField.description || ''"
      :label="formField.label"
      :label-for="formField.identifier"
    >
    <b-form-input :id="formField.identifier" v-model="vModel" trim></b-form-input>
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
  public vModel: string | number;

  public constructor() {

    super();

  }

}
</script>
