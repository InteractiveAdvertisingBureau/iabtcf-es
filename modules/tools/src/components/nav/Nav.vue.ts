import {Component, Vue} from 'vue-property-decorator';
import {SectionModel} from '../../model/SectionModel';
import NavGroup from './NavGroup.vue';

// eslint doesn't like these decorators...
// eslint-disable-next-line
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
