<template>
  <v-container>
    <v-row v-if="isError">
      <v-col
        cols="6"
        offset-md="3"
      >
        <v-alert type="error">
          {{ errorMessage }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-if="isReady">
      <v-col
        cols="6"
        offset-md="3"
      >
        <Dashboard/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import Dashboard from '@/components/Dashboard.vue';

export default {
  name: 'DashboardView',

  components: {
    Dashboard,
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
      retreiveSensors: 'sensors/retreiveSensors',
    }),

    async initData() {
      try {
        const response = await this.retreiveSensors();

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
