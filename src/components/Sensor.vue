<template>
  <form>
    <h2 class="headline mb-4">Sensor #{{ id }}</h2>
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
      saveSensor: 'sensors/saveSensor',
      saveSensorItem: 'sensors/saveSensorItem',
    }),

    async onSave() {
      try {
        const response = await this.saveSensor();

        if (response) {
          this.$router.push({
            path: 'dashboard',
          });
        }

        return true;
      } catch (error) {
        this.loginFail = true;
        this.loginFailMessage = error.message;

        return false;
      }
    },
  },
};
</script>
