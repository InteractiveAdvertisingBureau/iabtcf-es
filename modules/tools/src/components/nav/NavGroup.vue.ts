import { Component, Prop, Vue } from 'vue-property-decorator';
import { LinkModel } from '../../model/LinkModel';

@Component
export default class NavGroup extends Vue {

  @Prop() private sectionTitle!: string;
  @Prop() private sectionLinks!: LinkModel[];

  public get title(): string {
    return this.sectionTitle;
  }
  public get links(): LinkModel[] {
    return this.sectionLinks;
  }

}
