<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Description</th>
          <th class="text-left">Sampling period</th>
          <th class="text-left">Active</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="sensor in sensors"
          :key="sensor.id"
        >
          <td>{{ sensor.id }}</td>
          <td>{{ sensor.description }}</td>
          <td>{{ sensor.samplingPeriod }}</td>
          <td>
              <v-chip
                v-if="sensor.isActive"
                small
                color="green"
                text-color="white"
            >
              <v-icon>mdi-check</v-icon>
            </v-chip>

              <v-chip
                v-else
                small
                color="red"
                text-color="white"
            >
              <v-icon>mdi-close</v-icon>
            </v-chip>
          </td>
          <td>
            <v-btn
              outlined
              small
              :to="linkToSensor(sensor.id)"
            >
              Edit
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Sensors',

  computed: {
    ...mapGetters({
      sensors: 'sensors/sensors',
    }),
  },

  methods: {
    linkToSensor(id) {
      return `sensors/${id}`;
    },
  },
};
</script>
