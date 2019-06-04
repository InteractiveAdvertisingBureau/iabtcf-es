import {Component, Vue} from 'vue-property-decorator';
import PageHead from './PageHead.vue';

// eslint-disable-next-line
@Component({
  components: {
    PageHead,
  },
})
export default class Landing extends Vue {
}
