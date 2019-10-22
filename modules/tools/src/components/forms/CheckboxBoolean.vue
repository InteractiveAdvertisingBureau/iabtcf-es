<template>
  <b-input-group >
    <b-form-checkbox
      :id="valueName"
      :name="valueName"
      v-model="tcModel[valueName]"
      @input="$emit('update')"
      switch
    >
    {{label}}
    </b-form-checkbox>
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
  public tcModel: TCModel;

  public constructor() {

    super();

  }

}
</script>
