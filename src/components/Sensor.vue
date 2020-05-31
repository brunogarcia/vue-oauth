<template>
  <form>
    <h2 class="headline mb-4">Sensor #{{ id }}</h2>

    <v-alert
      v-if="isError"
      type="error"
    >
      {{ errorMessage }}
    </v-alert>

    <v-switch
      v-model="isActive"
      label="Does this sensor is active?"
    />

    <v-text-field
      outlined
      type="number"
      label="Sampling period"
      v-model.number="samplingPeriod"
    />

    <v-textarea
      outlined
      label="Description"
      v-model="description"
    />

    <v-btn class="mr-4" @click="onSave">Save</v-btn>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Sensor',

  data: () => ({
    isError: false,
    errorMessage: '',
  }),

  computed: {
    ...mapState(['sensors']),

    id: {
      get() {
        return this.sensors.sensor.id;
      },
    },

    description: {
      get() {
        return this.sensors.sensor.description;
      },
      set(value) {
        this.saveSensorItem({ description: value });
      },
    },

    isActive: {
      get() {
        return this.sensors.sensor.isActive;
      },
      set(value) {
        this.saveSensorItem({ isActive: value });
      },
    },

    samplingPeriod: {
      get() {
        return this.sensors.sensor.samplingPeriod;
      },
      set(value) {
        this.saveSensorItem({ samplingPeriod: value });
      },
    },
  },

  methods: {
    ...mapActions({
      updateSensor: 'sensors/updateSensor',
      saveSensorItem: 'sensors/saveSensorItem',
    }),

    async onSave() {
      try {
        const response = await this.updateSensor({
          id: this.id,
          description: this.description,
          isActive: this.isActive,
          samplingPeriod: this.samplingPeriod,
        });

        if (response) {
          this.$router.push({
            path: '/dashboard',
          });
        }

        return true;
      } catch (error) {
        this.isError = true;
        this.errorMessage = error.message;

        return false;
      }
    },
  },
};
</script>
