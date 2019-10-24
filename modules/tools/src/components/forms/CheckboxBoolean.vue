<template>
  <b-input-group >
    <b-form-checkbox
      :id="valueName"
      :name="valueName"
      @input="changeValue"
      switch
    >
    {{label}}
    </b-form-checkbox>
  </b-input-group>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component

export default class extends Vue {

  @Prop()
  public valueName: string;
  @Prop()
  public label: string;

  public constructor() {

    super();

  }

  private changeValue(newVal: boolean): void {

    this.$emit('update', newVal);

  }

}
</script>
