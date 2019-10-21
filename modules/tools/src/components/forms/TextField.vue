<template>
  <b-input-group >
    <b-form-group
      :id="valueName"
      :description="description"
      :label="label"
      :label-for="valueName"
    >
    <b-form-input :id="valueName" v-model="tcModel[valueName]" trim></b-form-input>
    </b-form-group>
  </b-input-group>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {TCModel} from '@iabtcf/core';

@Component

export default class extends Vue {

  @Prop()
  public valueName: string;
  @Prop()
  public label: string;
  @Prop()
  public description: string;
  @Prop()
  public tcModel: TCModel;

  public constructor() {

    super();

  }

}
</script>
