import {Component, Vue} from 'vue-property-decorator';
import PageHead from './PageHead.vue';
import {TCModel, CMPManifest} from '@iabtcf/core';

// eslint-disable-next-line
@Component({
  components: {
    PageHead,
  },
})
export default class TCStringEncode extends Vue {

  private tcmodel: TCModel;
  private cmpManifest: CMPManifest;

  public constructor() {

    super();

    this.tcmodel = new TCModel();
    this.tcmodel.setCMPManifest(new CMPManifest());
    this.cmpManifest = this.tcmodel.getCMPManifest();

  }

  public set cmpId(n: number) {

    this.cmpManifest.setCmpId(n);

  }

}
