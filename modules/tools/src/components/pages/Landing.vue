<template>
  <div>
    <PageHead title="TCF Tools">
    </PageHead>
    <h4>Resources</h4>
    <ul>
      <li>
        <a href="https://github.com/chrispaterson/iabtcf-es">
          TCF Code Library Github
        </a>
      </li>
      <li>
        <a href="https://iabtechlab.com/">iab. Tech Lab</a>
      </li>
      <li>
        <a href="https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework">
          iab. TCF Github
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
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
</script>
