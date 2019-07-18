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
                <input
                  class="input"
                  type="text"
                  name="name"
                  v-model="name"
                  v-validate="'required|min:4'"
                  :class="{ 'is-danger' : errors.has('name') }"
                >
                <p v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</p>
              </div>
            </div>

            <ErrorBar :error="error"/>

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
              <tr v-for="(group, index) in groups" :key="group.key">
                <th>{{ index + 1 }}</th>
                <td>
                  <a href="#">{{group.name}}</a>
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
import ErrorBar from "@/components/ErrorBar";

export default {
  data() {
    return {
      name: ""
    };
  },
  components: {
    ErrorBar
  },
  created() {
    const loadedGroups = this.$store.getters["admin/groups"];
    if (loadedGroups.length === 0) {
      this.$store.dispatch("admin/getGroups");
    }
  },
  methods: {
    onSubmit() {
      // admin is a child store
      this.$validator.validateAll().then(result => {
        if (result) {
          // in store/admin.js
          this.$store.dispatch("admin/createGroup", { name: this.name });
        }
      });
    },
    jobsDone() {
      this.name = "";
      this.$nextTick(() => {
        removeErrors();
      });
    },
    removeErrors() {
      this.$validator.reset();
      this.$store.commit("clearErrors");
    }
  },
  computed: {
    groups() {
      return this.$store.getters["admin/groups"];
    },
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