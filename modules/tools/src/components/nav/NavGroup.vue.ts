import {Component, Prop, Vue} from 'vue-property-decorator';
import {LinkModel} from '../../model/LinkModel';

@Component
export default class NavGroup extends Vue {

  // eslint-disable-next-line
  @Prop() 
  private sectionTitle!: string;
  // eslint-disable-next-line
  @Prop() 
  private sectionLinks!: LinkModel[];

  public get title(): string {

    return this.sectionTitle;

  }
  public get links(): LinkModel[] {

    return this.sectionLinks;

  }

}
