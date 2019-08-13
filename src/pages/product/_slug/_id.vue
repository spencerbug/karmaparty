<template>
  <div>
    <section v-if="busy" class="section">
      <progress class="progress is-large is-primary" max="100">Loading...</progress>
    </section>
    <section class="section left-right-pad">
      <div v-if="product" class="columns">
        <div class="column is-6">
          <div class="image is-4by3">
            <img :src="product.imageUrl" />
          </div>
        </div>
        <div class="column is-5 is-offset-1">
          <div class="title is-2">{{product.name}}</div>
          <p class="title is-3 has-text-muted">{{product.price | currency}}</p>
          <hr />
          <table class="table">
            <tbody>
              <tr>
                <td class>
                  <strong>Product Code:</strong>
                </td>
                <td>{{product.code}}</td>
              </tr>
              <tr>
                <td class>
                  <strong>Brand:</strong>
                </td>
                <td>{{product.brand}}</td>
              </tr>
              <tr>
                <td class>
                  <strong>Availability:</strong>
                </td>
                <td
                  :class="{'has-text-danger' : product.stock === 0}"
                >{{product.stock > 0 ? 'In stock' : 'Out of stock'}}</td>
              </tr>
            </tbody>
          </table>

          <div class="field is-grouped is-grouped-multiline">
            <p class="control">
              <input
                class="input has-text-centered"
                style="width:50px;"
                type="number"
                ref="quantity"
                value="1"
              />
            </p>
            <p class="control">
              <a
                class="button is-primary"
                @click.prevent="addToCart(product, $refs.quantity.value)"
              >Add to cart</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <error-bar :error="error"></error-bar>

    <section v-if="product && product.description" class="section">
      <h6 class="title is-6">Details</h6>
      <hr size="1" />
      <div class="content">
        <!-- inner-html prop allos us to insert filters -->
        <p :inner-html.prop="product.description | nl2br"></p>
      </div>
    </section>
  </div>
</template>

<script>
// import { fireApp } from "@/plugins/firebase";
import cartMixin from "@/mixins/cartMixin";
import apiJobMixin from "@/mixins/apiJobMixin";
import ErrorBar from "@/components/ErrorBar";
export default {
  mixins: [cartMixin, apiJobMixin],
  mounted() {
    this.$store.dispatch("catalog/getProductByKey", this.$route.params.id);
  },
  components: {
    ErrorBar
  },
  computed: {
    product() {
      return this.$store.getters["product/product"];
    },
    busy() {
      return this.$store.getters["busy"];
    }
  },
  methods: {
    jobsDone() {
      return true;
    }
  }
  // asyncData({ params }) {
  //   // search engine friendly features
  //   return fireApp
  //     .database()
  //     .ref(`products/${params.id}`)
  //     .once("value")
  //     .then(snapShot => {
  //       let product = snapShot.val();
  //       product.key = params.id;
  //       return { product };
  //     });
  // },
  // head() {
  //   return {
  //     title: this.product.name,
  //     meta: [
  //       // hid: header id. Helps with SEO
  //       { hid: "description", name: "description", content: this.product.name }
  //       //todo: add keywords, and a keywords field in product-edit page
  //     ]
  //   };
  // }
};
</script>