<template>
  <div>
    <section class="section no-top-pad">
      <h5 class="title is-5">Product categories</h5>
      <hr>

      <div class="columns">
        <div class="column is-one-third">
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label class="label" v-if="!category">New category</label>
              <label class="label" v-else>Update category</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="name"
                  v-model="name"
                  v-validate="'required'"
                  :class="{ 'is-danger': errors.has('name') }"
                >
                <p v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</p>
              </div>
            </div>

            <error-bar :error="error"></error-bar>

            <div class="field">
              <div class="control">
                <button
                  class="button is-primary"
                  :class="{ 'is-loading': busy }"
                  :disabled="busy"
                >{{ !category ? 'Create' : 'Update' }}</button>
                <button
                  style="margin-left: 10px;"
                  type="button"
                  class="button"
                  @click.prevent="cancelUpdate()"
                  v-if="category"
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
                <th>Category</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(category, index) in categories" :key="category.key">
                <th>{{ ++index }}</th>
                <td>
                  <a href="#" @click.prevent="selectCategory(category)">{{ category.name }}</a>
                </td>
                <td>
                  <a href="#" @click.prevent="removeCategory(category)">
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
import ErrorBar from "~/components/ErrorBar";
import apiJobMixin from "~/mixins/apiJobMixin";

export default {
  data() {
    return {
      name: "",
      category: null
    };
  },
  mixins: [apiJobMixin],
  components: {
    ErrorBar: ErrorBar
  },
  mounted: function() {
    const loadedCats = this.$store.getters["product/categories"];
    if (loadedCats && loadedCats.length === 0) {
      this.$store.dispatch("product/getCategories");
    }
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          if (!this.category) {
            this.$store.dispatch("product/createCategory", { name: this.name });
          } else {
            this.$store.dispatch("product/updateCategory", {
              name: this.name,
              category: this.category
            });
          }
        }
      });
    },
    selectCategory(category) {
      this.category = category;
      this.name = category.name;
    },
    removeCategory(category) {
      this.$swal({
        title: "Delete the category?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(ok => {
        if (ok) {
          this.$store.dispatch("product/removeCategory", {
            category: category
          });
        }
      });
    },
    cancelUpdate() {
      this.category = null;
      this.jobsDone();
    },
    jobsDone() {
      this.category = null;
      this.name = "";
      this.$nextTick(() => {
        this.removeErrors();
      });
    }
  },
  middleware: "verify-admin",
  computed: {
    categories() {
      return this.$store.getters["product/categories"];
    }
  }
};
</script>