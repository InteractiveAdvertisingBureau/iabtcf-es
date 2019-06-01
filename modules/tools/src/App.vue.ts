import {Component, Vue} from 'vue-property-decorator';
import Nav from './components/nav/Nav.vue';
import Landing from './components/pages/Landing.vue';
import TCStringEncode from './components/pages/TCStringEncode.vue';

@Component({
  components: {
    Nav,
    Landing,
    TCStringEncode,
  },
})
export default class App extends Vue {

  private currentComponent: string;

  public constructor() {

    super();

    this.currentComponent = 'Landing';

  }

  public get selectedComponent(): string {

    return this.currentComponent;

  }

  public onNavClick(event: Event): void {

    console.dir(event);

  }

}
