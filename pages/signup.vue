<template>
  <div>
    <section class="section no-top-pad">
      <h5 class="title is-5">Signup</h5>
      <hr>

      <div class="columns is-centered is-mobile">
        <div class="column is-half-desktop is-full-mobile is-full-tablet">
          <form @submit.prevent="onSignUp">
            <div class="field">
              <label class="label">Full Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="fullname"
                  v-model="fullname"
                  v-validate="'required|min:1|alpha_spaces'"
                  :class="{ 'is-danger' : errors.has('fullname') }"
                >
                <p
                  v-show="errors.has('fullname')"
                  class="help is-danger"
                >{{ errors.first('fullname') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="email"
                  name="email"
                  v-model="email"
                  v-validate="'required|email'"
                  :class="{ 'is-danger' : errors.has('email') }"
                >
                <p v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  name="password"
                  v-model="password"
                  v-validate="'required:true|min:6'"
                  :class="{ 'is-danger' : errors.has('password') }"
                >
                <p
                  v-show="errors.has('password')"
                  class="help is-danger"
                >{{ errors.first('password') }}</p>
              </div>
            </div>

            <ErrorBar :error="error"/>

            <div class="field">
              <div class="control">
                <button
                  class="button is-primary"
                  :class="{ 'is-loading' : busy }"
                  :disabled="busy"
                >Signup</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ErrorBar from "@/components/ErrorBar";
export default {
  components: {
    ErrorBar
  },
  methods: {
    onSignUp() {
      this.$validator.validateAll().then(result => {
        if (result) {
          //this is the payload
          const signUpData = {
            fullname: this.fullname,
            email: this.email,
            password: this.password
          };
          this.$store.dispatch("signUpUser", signUpData);
        }
      });
    },
    jobsDone() {
      this.$nextTick(() => {
        this.removeErrors();
      });
      this.$router.replace("/");
    },
    removeErrors() {
      this.$validator.reset();
      this.$store.commit("clearError");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    busy() {
      return this.$store.getters.busy;
    },
    jobDone() {
      return this.$store.getters.jobDone;
    }
  },
  watch: {
    jobDone(value) {
      if (value) {
        this.$store.commit("setJobDone", false);
        this.jobsDone();
      }
    }
  },
  data() {
    return {
      fullname: "",
      email: "",
      password: ""
    };
  }
};
</script>