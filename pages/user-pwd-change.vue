<template>
  <div>
    <section class="section no-top-pad">
      <h5 class="title is-5">Password Change</h5>
      <hr>

      <div class="columns is-centered is-mobile">
        <div class="column is-half-desktop is-full-mobile is-full-tablet">
          <form @submit.prevent="changePwd">
            <div class="field">
              <label class="label">New password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  name="password"
                  ref="password"
                  v-model="password"
                  v-validate="'required|min:6'"
                  :class="{ 'is-danger': errors.has('password') }"
                >
                <p
                  v-show="errors.has('password')"
                  class="help is-danger"
                >{{ errors.first('password') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Confirm new password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  name="password_confirm"
                  v-model="password_confirm"
                  v-validate="'required|min:6|confirmed:password'"
                  :class="{ 'is-danger': errors.has('password_confirm') }"
                >
                <p
                  v-show="errors.has('password_confirm')"
                  class="help is-danger"
                >{{ errors.first('password_confirm') }}</p>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button
                  class="button is-primary"
                  :class="{ 'is-loading': busy }"
                  :disabled="busy"
                >Change Password</button>
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
      password: "",
      password_confirm: ""
    };
  },
  mixins: [apiJobMixin],
  components: {
    ErrorBar: ErrorBar
  },
  methods: {
    changePwd() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch("changePwd", { password: this.password });
        }
      });
    },
    jobsDone() {
      this.password = "";
      this.password_confirm = "";
      this.removeErrors();
      this.$swal({
        title: "Password changed successfuly",
        icon: "success"
      }).then(() => {
        this.$router.replace("/");
      });
    }
  }
};
</script>