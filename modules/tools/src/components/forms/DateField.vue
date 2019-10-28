<template>
  <b-input-group >
    <b-form-group
      :id="id"
      :label="label"
    >
      <datepicker
        v-model="tcModel[id]"
        @input="changeValue"
      />
    </b-form-group>
  </b-input-group>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';
import DatePicker from 'vuejs-datepicker';

@Component({
  components: {
    'datepicker': DatePicker,
  },
})

export default class extends FormComponent {}

</script>
