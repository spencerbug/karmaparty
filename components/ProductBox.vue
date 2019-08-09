<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <nuxt-link to="/product">
          <img :src="product.imageUrl" alt="Image">
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
          <a href="#" class="button is-primary">Add to Cart</a>
        </span>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  props: ["product"]
  //currency filter in plugins/filters.js (makes any number $#.#)
};
</script>

