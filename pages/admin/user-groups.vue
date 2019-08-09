<template>
  <div>
    <section class="section no-top-pad">
      <h5 class="title is-5">User groups</h5>
      <hr>

      <div class="columns">
        <div class="column is-one-third">
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label class="label" v-if="!group">New user group</label>
              <label class="label" v-else>Update user group</label>
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
                >{{ !group ? 'Create' : 'Update'}}</button>
                <button
                  style="margin-left:10px;"
                  type="button"
                  class="button"
                  @click="cancelUpdate()"
                  v-if="group"
                >Cancel</button>
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
            <tbody v-if="groups.length>0">
              <tr v-for="(group, index) in groups" :key="group.key">
                <th>{{ index + 1 }}</th>
                <td>
                  <a href="#" @click.prevent="selectGroup(group)">{{group.name}}</a>
                </td>
                <td>
                  <a href="#" @click.prevent="removeGroup(group)">
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
      name: "",
      group: null
    };
  },
  components: {
    ErrorBar
  },
  middleware: "verify-admin",
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
          if (!this.group) {
            this.$store.dispatch("admin/createGroup", { name: this.name });
          } else {
            this.$store.dispatch("admin/updateGroup", {
              name: this.name,
              group: this.group
            });
          }
        }
      });
    },
    selectGroup(group) {
      this.group = group;
      this.name = group.name;
    },
    cancelUpdate() {
      this.jobsDone();
    },
    removeGroup(group) {
      this.$swal({
        title: "Delete the group?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(ok => {
        if (ok) {
          this.$store.dispatch("admin/removeGroup", { group: group });
        }
      });
    },
    jobsDone() {
      this.group = null;
      this.name = "";
      this.$nextTick(() => {
        this.removeErrors();
      });
    },
    removeErrors() {
      this.$validator.reset();
      this.$store.commit("clearError");
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
  }
};
</script>