<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        Vintra Dashboard
      </div>
    </v-app-bar>

    <v-content>
      <Home />
    </v-content>
  </v-app>
</template>

<script>
import Home from './views/Home.vue';

export default {
  name: 'App',

  components: {
    Home,
  },
};
</script>
