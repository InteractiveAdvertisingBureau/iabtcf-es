<template>
  <b-input-group >
    <b-form-group
      :label="label"
    >
    <b-form-input
      v-model="tcModel[id]"
      size="sm"
      @input="changeValue"
      trim
    />
    </b-form-group>
  </b-input-group>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';

@Component

export default class extends FormComponent {

}
</script>
