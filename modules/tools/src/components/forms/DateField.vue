<template>
  <b-input-group >
    <b-form-group
      :id="valueName"
      :description="description"
      :label="label"
      :label-for="valueName"
      @input="$emit('update')"
    >
      <datepicker v-model="tcModel[valueName]" />
    </b-form-group>
  </b-input-group>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {TCModel} from '@iabtcf/core';
import DatePicker from 'vuejs-datepicker';

@Component({
  components: {
    'datepicker': DatePicker,
  },
})

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
