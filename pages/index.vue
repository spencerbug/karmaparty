<template>
  <div>
    <!-- <section class="section left-right-pad is-fluid">
      <div class="hero is-medium is-primary is-bold has-text-centered">
        <div class="hero-body">
          <h1 class="title">Warm Welcome to Karma Party!</h1>
          <h2 class="subtitle">Your presence is a present!</h2>
        </div>
      </div>
    </section>-->

    <section class="section">
      <div class="box">
        <nav class="level">
          <div class="level-left">
            <div class="field is-grouped is-grouped-multiline">
              <p class="control">
                <input class="input" type="text" placeholder="Keyword">
              </p>
              <p class="control">
                <span class="select">
                  <select>
                    <option>All</option>
                    <option>Drones</option>
                    <option>Wearables</option>
                  </select>
                </span>
              </p>
            </div>
          </div>

          <div class="level-right">
            <div class="field is-grouped is-grouped-multiline">
              <p class="control">
                <span class="select">
                  <select>
                    <option>Latest</option>
                    <option>Price - Low to High</option>
                    <option>Price - High to Low</option>
                  </select>
                </span>
              </p>
            </div>
          </div>
        </nav>
      </div>

      <div class="columns is-mobile is-multiline">
        <div
          class="column is-full-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <nuxt-link to="/product">
                  <img src="http://placehold.it/800x600" alt="Image">
                </nuxt-link>
              </figure>
            </div>
            <div class="card-content">
              <div class="media-content has-text-centered">
                <p class="subtitle is-6">Black Drone</p>
                <p class="title is-4">$374.69</p>
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
        </div>

        <div
          class="column is-full-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <a href="product.html">
                  <img src="http://placehold.it/800x600" alt="Image">
                </a>
              </figure>
            </div>
            <div class="card-content">
              <div class="media-content has-text-centered">
                <p class="subtitle is-6">Black Drone</p>
                <p class="title is-4">$374.69</p>
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
        </div>

        <div
          class="column is-full-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <a href="product.html">
                  <img src="http://placehold.it/800x600" alt="Image">
                </a>
              </figure>
            </div>
            <div class="card-content">
              <div class="media-content has-text-centered">
                <p class="subtitle is-6">Black Drone</p>
                <p class="title is-4">$374.69</p>
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
        </div>

        <div
          class="column is-full-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <a href="product.html">
                  <img src="http://placehold.it/800x600" alt="Image">
                </a>
              </figure>
            </div>
            <div class="card-content">
              <div class="media-content has-text-centered">
                <p class="subtitle is-6">Black Drone</p>
                <p class="title is-4">$374.69</p>
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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.hero {
  border-radius: 10px;
}
</style>
