<template>
  <p>{{ sensors }}</p>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',

  computed: {
    ...mapGetters({
      sensors: 'sensors/sensors',
    }),
  },
};
</script>
