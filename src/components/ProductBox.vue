<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <nuxt-link :to="{ path: productPath(product.name, product.key) }">
          <img :src="product.imageUrl" alt="Image" />
        </nuxt-link>
      </figure>
    </div>
    <div class="card-content">
      <div class="media-content has-text-centered">
        <p class="subtitle is-6">{{product.name}}</p>
        <p class="title is-4 has-text-dark">{{product.price | currency}}</p>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          <a href="#" class="button is-primary" @click.prevent="addToCart(product)">Add to Cart</a>
        </span>
      </p>
    </footer>
  </div>
</template>

<script>
import cartMixin from "@/mixins/cartMixin";
export default {
  props: ["product"],
  mixins: [cartMixin], //cart, addToCart, cartTotal
  methods: {}
};
</script>

