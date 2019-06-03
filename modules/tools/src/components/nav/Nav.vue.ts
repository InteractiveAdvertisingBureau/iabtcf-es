import {Component, Vue} from 'vue-property-decorator';
import {SectionModel} from '../../model/SectionModel';
import NavGroup from './NavGroup.vue';

@Component({
  components: {
    NavGroup,
  },
})

export default class Nav extends Vue {

  public sectionModel: SectionModel = new SectionModel();
  public get sections(): string[] {

    return Array.from(this.sectionModel.keys());

  }

}
