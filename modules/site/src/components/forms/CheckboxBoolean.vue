<template>
  <b-input-group >
    <b-form-checkbox
      :id="id"
      :name="id"
      @input="changeValue"
      switch
    >
      {{ label }}
    </b-form-checkbox>
  </b-input-group>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';

@Component

export default class extends FormComponent {

  // default
}
</script>
