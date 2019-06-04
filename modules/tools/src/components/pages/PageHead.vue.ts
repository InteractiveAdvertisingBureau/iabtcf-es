import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class PageHead extends Vue {

  // eslint-disable-next-line
  @Prop() 
  public title!: string;


}
