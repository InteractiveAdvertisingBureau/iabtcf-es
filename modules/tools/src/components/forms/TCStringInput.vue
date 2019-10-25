<template>
     <b-form-input
       class="tcstring-input"
       v-model="tcstring"
       @click="selectContents"
       readonly
       />
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component

export default class extends Vue {

  @Prop()
  public tcstring: string;

  private selectContents(e: MouseEvent): void {

    if (e && e.target && e.target) {

      (e.target as HTMLInputElement).select();

    }

  }

}
</script>
