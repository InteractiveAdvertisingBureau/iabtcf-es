import {Component, Prop, Vue} from 'vue-property-decorator';
import {TCModel} from '@iabtcf/core';

@Component

export class FormComponent extends Vue {

  @Prop()
  public tcModel: TCModel;
  @Prop()
  public id: string;
  @Prop()
  public label: string;

  protected changeValue(newVal: boolean | string | number): void {

    if (this.tcModel[this.id] !== newVal) {

      this.tcModel[this.id] = newVal;

    }

    this.$emit('update');

  }

}
