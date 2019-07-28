<template>
  <div class="responsive-background">
    <div class="container main-body">
      <nav class="navbar section">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" to="/">
            <!-- <img src="/nshop-logo.png" width="120" height="28"> -->
            <img src="/kp_logo.png" width="120" height="28">
          </nuxt-link>

          <div class="navbar-burger burger" data-target="top-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="top-menu" class="navbar-menu">
          <div class="navbar-start">
            <nuxt-link class="navbar-item" to="/">Home</nuxt-link>
            <nuxt-link class="navbar-item" to="/about">About</nuxt-link>

            <div class="navbar-item has-dropdown is-hoverable" v-if="userIsAdmin">
              <a
                class="navbar-link"
                :class="{ 'is-active' : isActive.admin }"
                @click="toggleActive('admin')"
                href="#"
              >Admin</a>
              <div class="navbar-dropdown" :class="{ 'is-hidden' : !isActive.admin }">
                <nuxt-link class="navbar-item" to="/admin/product-list">Products</nuxt-link>
                <nuxt-link class="navbar-item" to="/admin/product-categories">Product Categories</nuxt-link>
                <a class="navbar-item" href="#">Orders</a>
                <a class="navbar-item" href="#">Customers</a>
                <nuxt-link class="navbar-item" to="/admin/administrators">Administrators</nuxt-link>
                <nuxt-link class="navbar-item" to="/admin/user-groups">User Groups</nuxt-link>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable" v-if="userLoggedIn">
              <a
                href="#"
                class="navbar-link"
                :class="{ 'is-active' : isActive.profile }"
                @click="toggleActive('profile')"
              >Hi, {{username}}</a>
              <div class="navbar-dropdown" :class="{ 'is-hidden' : !isActive.profile }">
                <nuxt-link class="navbar-item" to="/user-profile">Profile</nuxt-link>
                <nuxt-link class="navbar-item" to="/usr-pwd-change">Change Password</nuxt-link>
                <a class="navbar-item" @click="logOut">Log Out</a>
              </div>
            </div>
            <div class="navbar-item" v-else>Hi, {{username}}</div>

            <div class="navbar-item">
              <div class="field is-grouped is-grouped-multiline">
                <p class="control">
                  <nuxt-link class="button" to="/cart">
                    <span class="icon is-small">
                      <i class="fa fa-shopping-cart"></i>
                    </span>
                    <span>&bullet; 0 item ($0.00)</span>
                  </nuxt-link>
                </p>

                <p class="control" v-if="!userLoggedIn">
                  <nuxt-link class="button is-primary" to="/login">
                    <span class="icon is-small">
                      <i class="fa fa-unlock-alt"></i>
                    </span>
                    <span>Login</span>
                  </nuxt-link>
                </p>

                <p class="control" v-if="!userLoggedIn">
                  <nuxt-link class="button is-info" to="/signup">
                    <span class="icon is-small">
                      <i class="fa fa-user-o"></i>
                    </span>
                    <span>Sign up</span>
                  </nuxt-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nuxt/>
      <!-- This is where the pages are presented -->
    </div>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            &copy; Karma Party LLC
            <br>Made with Nuxt and Firebase
          </p>
          <p>
            <img src="/kp_icon.png" width="20">
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "Guest",
      isActive: {
        admin: true,
        profile: true
      }
    };
  },
  created() {
    //on refresh, check if a user is logged in
    if (!this.userLoggedIn) {
      this.$store.dispatch("setAuthStatus");
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.push("/");
    },
    toggleActive(menu) {
      this.isActive[menu] = !this.isActive[menu];
    }
  },
  computed: {
    userProfile() {
      return this.$store.getters.user;
    },
    userLoggedIn() {
      return this.$store.getters.loginStatus;
    },
    userIsAdmin() {
      return this.$store.getters.userRole === "admin";
    }
  },
  watch: {
    userProfile(value) {
      if (value) {
        this.username = value.name;
      } else {
        this.username = "Guest";
      }
    }
  }
};
</script>


<style lang="scss">
.responsive-background {
  // backdrop-filter: contrast(50%) brightness(150%) blur(2px);
  background-image: url(../static/background-lighter.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>


