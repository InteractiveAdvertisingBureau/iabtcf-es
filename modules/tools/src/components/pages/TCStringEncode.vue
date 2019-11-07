<template>
  <div>
    <form>
      <b-row>
        <b-col cols="12">
          <tc-string-input
            v-model=encodedTCString
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2">
          <b-card bg-variant="light" class="b-card">
            <form-select
              label="Vendor List Version"
               :tcModel="tcModel"
               :options="vendorListVersions"
               id="vendorListVersion"
               @update="onVendorListSet"
              />
            <template v-if="isReady">
              <text-field
                 v-for="formField in formFields"
                   :label="formField.text"
                   :tcModel="tcModel"
                   :id="formField.value"
                   :key="formField.value"
                   @update="update"
              />
              <form-select
                label="Consent Language"
                 :tcModel="tcModel"
                 :options="languages"
                 id="consentLanguage"
                 @update="update"
                />
              <form-select
                label="Pub Country Code"
                 :tcModel="tcModel"
                 :options="countries"
                 id="publisherCountryCode"
                 @update="update"
                />
            </template>
          </b-card>
        </b-col>

        <template v-if="isReady">
          <b-col cols="3">
            <b-card bg-variant="light" class="b-card">
              <date-field
                 id="created"
                 label="Created Date"
                 :tcModel="tcModel"
                 @update="update"
              />
              <date-field
                 id="lastUpdated"
                 label="Last Updated Date"
                 :tcModel="tcModel"
                 @update="update"
              />

              <checkbox-boolean
                 v-for="field in boolFields"
                   :id="field.value"
                   :label="field.text"
                   :tcModel="tcModel"
                   :key="field.value"
                   @update="update"
               />
              <br />
            </b-card>
          </b-col>

          <b-col cols="3">
            <b-card bg-variant="light" class="b-card">
              <big-form-select
                label="Vendor Consents"
                 :tcModel="tcModel"
                 :options="vendors"
                 id="vendorConsents"
                 @update="update"
                />
              <big-form-select
                label="Vendor Legitimate Interest"
                 :tcModel="tcModel"
                 :options="vendors"
                 id="vendorLegitimateInterest"
                 @update="update"
                />
              <big-form-select
                label="OOB Vendors Allowed"
                 :tcModel="tcModel"
                 :options="vendors"
                 id="vendorsAllowed"
                 @update="update"
                />
              <big-form-select
                label="OOB Vendors Disclosed"
                 :tcModel="tcModel"
                 :options="vendors"
                 id="vendorsDisclosed"
                 @update="update"
                />
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card bg-variant="light" class="b-card">
              <big-form-select
                label="Purpose Consents"
                 :tcModel="tcModel"
                 :options="purposes"
                 id="purposeConsents"
                 @update="update"
                />
              <big-form-select
                label="Purpose Legitimate Interest"
                 :tcModel="tcModel"
                 :options="purposes"
                 id="purposeConsents"
                 @update="update"
                />
              <big-form-select
                label="Special Feature Optins"
                 :tcModel="tcModel"
                 :options="specialFeatures"
                 id="specialFeatureOptIns"
                 @update="update"
                />
            </b-card>
          </b-col>
        </template>
      </b-row>
    </form>
  </div>
</template>

<script lang="ts" src="./TCStringEncode.ts">
</script>
