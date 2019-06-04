import {Component, Vue} from 'vue-property-decorator';
import VueRouter from 'vue-router';
import {RouteConfig} from 'vue-router';
import Nav from './components/nav/Nav.vue';
import {SectionModel} from './model/SectionModel';
import BootstrapVue from 'bootstrap-vue';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const sectionModel: SectionModel = new SectionModel();
const routes: RouteConfig[] = sectionModel.getRouteConfig();

const router = new VueRouter({routes});

// eslint doesn't like these decorators...
// eslint-disable-next-line
@Component({
  router,
  components: {
    Nav,
  },
})
export default class App extends Vue {};
