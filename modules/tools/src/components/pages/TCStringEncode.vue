<template>
  <div>
    <PageHead title="Encode a TCString"></PageHead>
    <form>

      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="4"
          label="CMP Info"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >

          <b-input-group >
            <b-form-group
              id="cmp_id"
              description="iab. assigned CMP ID"
              label="CMP ID"
              label-for="cmpId"
            >
              <b-form-input id="cmpId" v-model="cmpId" trim></b-form-input>
            </b-form-group>
          </b-input-group>
          <b-input-group >
            <b-form-group
              id="cmp_version"
              description="Integer version of CMP (eg. 2)"
              label="CMP Version"
              label-for="cmpVersion"
            >
              <b-form-input id="cmpVersion" v-model="cmpVersion" trim></b-form-input>
            </b-form-group>
          </b-input-group>
        </b-form-group>
      </b-card>

      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="4"
          label="CMP Info"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
        </b-form-group>
      </b-card>

    </form>
  </div>
</template>

<script src="./TCStringEncode.vue.ts" lang="ts">
</script>
