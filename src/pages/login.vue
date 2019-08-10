<template>
  <div>
    <section class="section no-top-pad">
      <h5 class="title is-5">Login</h5>
      <hr />

      <div class="columns is-centered is-mobile">
        <div class="column is-half-desktop is-full-mobile is-full-tablet">
          <form @submit.prevent="onLogin">
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
                />
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
                  :class="{ 'is-danger' : errors.has('password') }"
                />
                <p
                  v-show="errors.has('password')"
                  class="help is-danger"
                >{{ errors.first('password') }}</p>
              </div>
            </div>

            <ErrorBar :error="error" />
            <div class="field">
              <div class="control">
                <button
                  class="button is-primary"
                  :class="{ 'is-loading' : busy }"
                  :disabled="busy"
                >Login</button>
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
import apiJobMixin from "@/mixins/apiJobMixin";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mixins: [apiJobMixin],
  components: {
    ErrorBar
  },
  beforeCreate() {
    const loggedIn = this.$store.getters.loginStatus;
    if (loggedIn) {
      this.$router.replace("/");
    }
  },
  methods: {
    onLogin() {
      this.$validator.validateAll().then(result => {
        if (result) {
          //this is the payload
          const loginData = {
            email: this.email,
            password: this.password
          };
          this.$store.dispatch("loginUser", loginData);
        }
      });
    },
    jobsDone() {
      this.$nextTick(() => {
        this.removeErrors();
      });
      let nextRoute = "/";
      //if you added items to the cart before you logged in,
      //logging in will route you the where you left off
      const forwardRoute = this.$store.getters.forwardRoute;
      if (forwardRoute !== null) {
        nextRoute = forwardRoute;
        this.$store.commit("setForwardRoute", null);
      }
      this.$router.replace(nextRoute);
    }
  }
};
</script>