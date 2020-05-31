<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Description</th>
          <th class="text-left">Sampling period</th>
          <th class="text-left">Active</th>
        </tr>
      </thead>
      <tbody>
        <tr>
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
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Sensor',

  computed: {
    ...mapGetters({
      sensor: 'sensors/sensor',
    }),
  },
};
</script>
