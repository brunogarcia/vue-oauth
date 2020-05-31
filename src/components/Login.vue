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
    <v-row>
      <v-col
        cols="6"
        offset-md="3"
      >
        <form>
          <v-text-field
            v-model="username"
            :error-messages="usernameErrors"
            label="Username"
            required
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
          />

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :error-messages="passwordErrors"
            name="input-10-1"
            label="Password"
            counter
            @click:append="showPassword = !showPassword"
          />

          <v-btn class="mr-4" @click="onLogin">Login</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  mixins: [validationMixin],

  validations: {
    username: { required },
    password: { required },
  },

  data: () => ({
    username: 'test',
    password: '1234',
    showPassword: false,
    isError: false,
    errorMessage: '',
  }),

  computed: {
    usernameErrors() {
      const errors = [];

      if (!this.$v.username.$dirty) {
        return errors;
      }

      if (!this.$v.username.required) {
        errors.push('The user name is required.');
      }

      return errors;
    },

    passwordErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) {
        return errors;
      }

      if (!this.$v.password.required) {
        errors.push('The password is required');
      }

      return errors;
    },
  },

  methods: {
    ...mapActions({
      login: 'auth/login',
    }),

    async onLogin() {
      try {
        const response = await this.login({
          username: this.username,
          password: this.password,
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
