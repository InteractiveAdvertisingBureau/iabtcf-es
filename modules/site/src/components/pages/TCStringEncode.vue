<template>
  <div>
  <template v-if="!isReady">
    <p>Loading...</p>
  </template>
  <template v-if="isReady">
    <form>
      <b-row>
        <b-col cols="12">
          <b-card
            bg-variant="light"
            class="b-card">
            <tc-string-input
              :tcModel="tcModel"
            />
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2">
          <b-card
            bg-variant="light"
            class="b-card">
              <text-field
                v-for="formField in formFields"
                :label="formField.text"
                :tc-model="tcModel"
                :id="formField.value"
                :key="formField.value"
                @update="update"
              />
              <form-select
                label="Vendor List Version"
                :tc-model="tcModel"
                :options="vendorListVersions"
                id="vendorListVersion"
                @update="onVendorListSet"
              />
              <form-select
                label="Consent Language"
                :tc-model="tcModel"
                :options="languages"
                id="consentLanguage"
                @update="update"
              />
              <form-select
                label="Pub Country Code"
                :tc-model="tcModel"
                :options="countries"
                id="publisherCountryCode"
                @update="update"
              />
              <date-field
                id="created"
                label="Created Date"
                :tc-model="tcModel"
                @update="update"
              />
              <date-field
                id="lastUpdated"
                label="Last Updated Date"
                :tc-model="tcModel"
                @update="update"
              />

              <checkbox-boolean
                v-for="field in boolFields"
                :id="field.value"
                :label="field.text"
                :tc-model="tcModel"
                :key="field.value"
                @update="update"
              />
              <br >
            </b-card>
          </b-col>

          <b-col cols="3">
            <b-card
              bg-variant="light"
              class="b-card">
              <big-form-select
                label="Vendor Consents"
                :tc-model="tcModel"
                :options="vendors"
                id="vendorConsents"
                @update="update"
              />
              <big-form-select
                label="Vendor Legitimate Interest"
                :tc-model="tcModel"
                :options="vendors"
                id="vendorLegitimateInterest"
                @update="update"
              />
              <big-form-select
                label="OOB Vendors Allowed"
                :tc-model="tcModel"
                :options="vendors"
                id="vendorsAllowed"
                @update="update"
              />
              <big-form-select
                label="OOB Vendors Disclosed"
                :tc-model="tcModel"
                :options="vendors"
                id="vendorsDisclosed"
                @update="update"
              />
            </b-card>
          </b-col>
          <b-col cols="3">
            <b-card
              bg-variant="light"
              class="b-card">
              <big-form-select
                label="Purpose Consents"
                :tc-model="tcModel"
                :options="purposes"
                id="purposeConsents"
                @update="update"
              />
              <big-form-select
                label="Purpose Legitimate Interest"
                :tc-model="tcModel"
                :options="purposes"
                id="purposeConsents"
                @update="update"
              />
              <big-form-select
                label="Special Feature Optins"
                :tc-model="tcModel"
                :options="specialFeatures"
                id="specialFeatureOptIns"
                @update="update"
              />
            </b-card>
          </b-col>
      </b-row>
    </form>
  </template>
  </div>
</template>

<script lang="ts" src='./TCStringEncode.ts'></script>
