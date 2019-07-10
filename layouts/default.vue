<template>
  <div>
    <div class="container main-body">
      <nav class="navbar section">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" to="/">
            <img src="/nshop-logo.png" width="120" height="28">
          </nuxt-link>

          <div class="navbar-burger burger" data-target="top-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>  

        <div id="top-menu" class="navbar-menu">
          <div class="navbar-start">
            <nuxt-link class="navbar-item" to="/">
                Home
            </nuxt-link>        
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link is-active" href="#">
                Admin
              </a>
              <div class="navbar-dropdown ">
                <nuxt-link class="navbar-item" to="/admin/product-list">
                  Products
                </nuxt-link>
                <nuxt-link class="navbar-item" to="/admin/product-categories">
                  Product Categories
                </nuxt-link>  
                <a class="navbar-item " href="#">
                  Orders
                </a>
                <a class="navbar-item " href="#">
                  Customers
                </a>
                <nuxt-link class="navbar-item" to="/admin/administrators">
                  Administrators
                </nuxt-link>                      
                <nuxt-link class="navbar-item" to="/admin/user-groups">
                  User Groups
                </nuxt-link>
              </div>
            </div>
          </div>

          <div class="navbar-end">   
            <div class="navbar-item">
              Hi, Guest
            </div>       
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

                <p class="control">
                  <nuxt-link class="button is-primary" to="/login">  
                      <span class="icon is-small">
                          <i class="fa fa-unlock-alt"></i>
                      </span>
                      <span>
                        Login
                      </span>
                  </nuxt-link>
                </p>

                <p class="control">
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
      <nuxt/> <!-- This is where the pages are presented -->
    </div>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            &copy; Nshop<br>
            Nuxt & Vue Jump-start.
          </p>
          <p>
            <img src="/nshop-icon.png">
          </p>
        </div>
      </div>
    </footer>    
  </div>
</template>
