<template>
  <v-container>
    <v-row v-if="isError">
      <v-col
        cols="8"
        offset-md="2"
      >
        <v-alert type="error">
          {{ errorMessage }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-if="isReady">
      <v-col
        cols="8"
        offset-md="2"
      >
        <Sensor/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import Sensor from '@/components/Sensor.vue';

export default {
  name: 'SensorsView',

  components: {
    Sensor,
  },

  data: () => ({
    isReady: false,
    isError: false,
    errorMessage: '',
  }),

  created() {
    this.initData();
  },

  methods: {
    ...mapActions({
      retreiveSensor: 'sensors/retreiveSensor',
    }),

    async initData() {
      try {
        const { id } = this.$route.params;
        const response = await this.retreiveSensor(id);

        if (response) {
          this.isReady = true;
        }

        return true;
      } catch (error) {
        this.error = true;
        this.errorMessage = error.message;

        return false;
      }
    },
  },
};
</script>
