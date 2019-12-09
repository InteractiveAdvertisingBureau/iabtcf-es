<template>
  <b-form-input
    class="tcstring-input"
    v-model="tcstring"
    @click="selectContents"
    plaintext
  />
</template>

<script lang="ts">

import {TCString} from '@iabtcf/core';
import {Component, Prop} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';

@Component
export default class extends FormComponent {

  private tcstring_: string;

  private get tcstring(): string {

    return TCString.encode(this.tcModel);

  }

  private selectContents(e: MouseEvent): void {

    if (e && e.target && e.target) {

      (e.target as HTMLInputElement).select();

    }

  }

}

</script>
