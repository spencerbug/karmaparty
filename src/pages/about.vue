<template>
  <div>
    <!-- hero -->
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <a class="has-text-white" href="/about#about">About Karma Party</a>
          </h1>
          <h3
            class="subtitle"
          >We connect people with each other, with exciting, ethical, socially impactful brands and causes through fun gift exchange parties!</h3>
        </div>
      </div>
      <div class="hero-foot">
        <nav class="tabs is-boxed is-fullwidth is-fixed-bottom">
          <ul>
            <li>
              <a href="/about#howitworks">How It Works</a>
            </li>
            <li class>
              <a href="/about#mission">Our Mission</a>
            </li>
            <li class>
              <a href="/about#values">Our Values</a>
            </li>
            <li class>
              <a href="/about#team">Our Team</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <!-- How it works -->
    <section class="section" id="howitworks">
      <div class="box is-primary is-size-5">
        <h1 class="title has-text-centered">How It Works</h1>
        <p>When you sign up to attend a Karma Party, we’ll find you a Karma Party box we think you will love, full of quality socially impactful products. When you open it at the party, we promise you’ll be pleasantly surprised!</p>
        <br />
        <p>At the party you’ll have a lot of fun, make great memories and learn new knowledge of positive socially impactful companies and what they do.</p>
        <br />
        <p>Enjoy a relaxing atmosphere, practice mindfulness meditation and talk about contemporary issues of our society. You’ll come home feeling more present, mindful, connected to theworld, and have awesome new products!</p>
      </div>
    </section>
    <!-- Mission -->
    <section class="section" id="mission">
      <div class="box is-primary is-size-5">
        <h1 class="title has-text-centered">Our Mission</h1>
        <figure class="image is-128x128 is-pulled-right">
          <img src="/recycle.png" alt />
        </figure>
        <p>Our mission is to connect people with new impactful brands, social causes, and eachother - face to face. The three of these should be united in a beautiful cycle of capitalism, social impact, and human connection working together.</p>
        <br />
        <p>For people, we want to connect people together with each other. People are getting more and more lonely, and we want to fight against that trend.</p>
        <br />
        <p>For the brands, we want to promote new companies that make cool products that are sustainable, ethical and impactful. An example is a candle company that benefits soup kitchens, or a chocolate company that employs ex-convicts and donates part of the money to womens health.</p>
        <br />
        <p>For causes, we want to find the most effective and impactful nonprofits, and benefit those with part of margins. You can learn about these organizations here.</p>
      </div>
    </section>
    <!-- Values -->
    <section class="section" id="values">
      <div class="box is-primary is-size-5">
        <h1 class="title has-text-centered">Our Values</h1>
        <p>
          We want to be a company of trust. We trust the customers, we trust the companies
          We all need a part to play to be masters of our own destiny, to make this society better.
          There’s two ways you have power as a citizen, through your dollar and through your vote.
          Transparency, honesty, connection
        </p>
      </div>
    </section>
    <!-- Our team -->
    <section class="section" id="team">
      <div class="box is-primary is-size-5">
        <h1 class="title has-text-centered">Our Team</h1>
        <p>
          Spencer Neilan
          <br />Leaht Neilan
          <br />Elan Feldman
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "ABOUT"
    };
  }
};
</script>

<style lang="scss">
h1 {
  letter-spacing: 5px;
}
.box {
  padding-left: 3rem;
  padding-right: 3rem;
  text-align: justify;
}
</style>
