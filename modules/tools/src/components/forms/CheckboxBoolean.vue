<template>
  <b-input-group >
    <b-form-checkbox
      :id="valueName"
      :name="valueName"
      v-model="vModel"
      @input="$emit('update')"
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
  @Prop()
  public vModel: boolean;

  public constructor() {

    super();

  }

}
</script>
