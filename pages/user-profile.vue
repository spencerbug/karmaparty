<template>
  <div>
    <section class="section no-top-pad">
      <h5 class="title is-5">Profile</h5>
      <hr>

      <div class="columns is-centered is-mobile">
        <div class="column is-half-desktop is-full-mobile is-full-tablet">
          <form @submit.prevent="updateProfile">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="fullname"
                  v-model="fullname"
                  v-validate="'required|min:4'"
                  :class="{ 'is-danger': errors.has('fullname') }"
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
                  :class="{ 'is-danger': errors.has('email') }"
                >
                <p v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</p>
              </div>
            </div>

            <error-bar :error="error"></error-bar>

            <div class="field">
              <div class="control">
                <button
                  type="submit"
                  class="button is-primary"
                  :class="{ 'is-loading': busy }"
                  :disabled="busy"
                >Update</button>
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
      fullname: ""
    };
  },
  mixins: [apiJobMixin],
  components: {
    ErrorBar: ErrorBar
  },
  mounted: function() {
    this.$store.commit("clearError");
    const user = this.$store.getters.user;
    if (user) {
      this.email = user.email;
      this.fullname = user.name;
    }
  },
  methods: {
    updateProfile() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch("updateProfile", {
            fullname: this.fullname,
            email: this.email
          });
        }
      });
    },
    jobsDone() {
      this.$swal({
        title: "Profile updated successfuly",
        icon: "success"
      });
    }
  },
  // If data gone after page reload
  computed: {
    userData() {
      return this.$store.getters.user;
    }
  },
  watch: {
    userData(value) {
      if (value) {
        this.email = value.email;
        this.fullname = value.name;
      }
    }
  }
};
</script>