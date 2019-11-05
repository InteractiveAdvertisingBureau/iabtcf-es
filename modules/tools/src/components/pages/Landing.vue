<template>
  <div>
    <h4>TC string</h4>
    <ul>
      <li>
        <router-link to="encode">Encode</router-link>
      </li>
    </ul>
    <h4>External Links</h4>
    <ul>
      <li>
        <a href="https://github.com/chrispaterson/iabtcf">
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

// eslint-disable-next-line
@Component({
  components: {
  },
})
export default class Landing extends Vue {
}
</script>
