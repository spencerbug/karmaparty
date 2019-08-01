<template>
  <div>
    <section class="section no-top-pad">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <h5 class="title is-5">Products</h5>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <nuxt-link class="button is-primary" to="/admin/product-edit">Add</nuxt-link>
          </div>
        </div>
      </nav>
      <hr>
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Product</th>
            <th>Code</th>
            <th>Brand</th>
            <th class="has-text-centered">Stock</th>
            <th class="has-text-centered">Status</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.key">
            <th>{{ ++index }}</th>
            <td>
              <img :src="product.imageUrl" class="image is-48x48">
            </td>
            <td>
              <a href="#">{{ product.name }}</a>
            </td>
            <td>{{ product.code }}</td>
            <td>{{ product.brand }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.status == 1 ? 'Available' : 'Not Available' }}</td>
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
    </section>
  </div>
</template>

<script>
export default {
  created() {
    const loadedProducts = this.$store.getters["product/products"];
    if (loadedProducts.length === 0) {
      this.$store.dispatch("product/getProducts");
    }
  },
  computed: {
    products() {
      let products = this.$store.getters["product/products"];

      return products;
    }
  }
};
</script>