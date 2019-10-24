<template>
     <b-form-input
       class="tcstring-input"
       v-model="value"
       @click="selectContents"
       readonly
       />
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component

export default class extends Vue {

  @Prop()
  public value: string = '';

  private selectContents(e: MouseEvent): void {

    if (e && e.target) {

      (e.target as HTMLInputElement).select();

    }

  }

}
</script>
