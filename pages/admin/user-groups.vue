<template>
  <div>
    <section class="section no-top-pad">
      <h5 class="title is-5">User groups</h5>
      <hr>

      <div class="columns">
        <div class="column is-one-third">
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label class="label">New user group</label>
              <div class="control">
                <input class="input" type="text" v-model="name">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button
                  type="submit"
                  class="button is-primary"
                  :class="{ 'is-loading' : busy }"
                  :disabled="busy"
                >Create</button>
              </div>
            </div>
          </form>
        </div>
        <div class="column">
          <table class="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>User group</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>
                  <a href="#">Administrator</a>
                </td>
                <td>
                  <a href="#">
                    <span class="icon has-text-danger">
                      <i class="fa fa-lg fa-times-circle"></i>
                    </span>
                  </a>
                </td>
              </tr>
              <tr>
                <th>2</th>
                <td>
                  <a href="#">Customer</a>
                </td>
                <td>
                  <a href="#">
                    <span class="icon has-text-danger">
                      <i class="fa fa-lg fa-times-circle"></i>
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    onSubmit() {
      // admin is a child store
      this.$store.dispatch("admin/createGroup", { name: this.name });
    },
    jobsDone() {
      this.name = "";
      this.removeErrors();
    },
    removeErrors() {
      this.$store.commit("clearErrors");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    busy() {
      return this.$store.getters.busy;
    },
    done() {
      return this.$store.getters.done;
    }
  },
  watch: {
    jobDone(value) {
      if (value) {
        this.$store.commit("setJobDone", false);
        this.jobsDone();
      }
    }
  }
};
</script>