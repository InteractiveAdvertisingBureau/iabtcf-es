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

  protected changeValue(newVal: boolean | string | number | string[] | Date): void {

    if (Array.isArray(newVal)) {

      // this would be a vector

      const newIDs = newVal.map((id: string): number => parseInt(id, 10));

      this.tcModel[this.id].empty();
      this.tcModel[this.id].set(newIDs);
      this.$emit('update', newVal);

    } else if (this.tcModel[this.id] !== newVal) {

      // this is a single value

      this.tcModel[this.id] = newVal;
      this.$emit('update', newVal);

    }

  }

}
