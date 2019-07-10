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
          <tr>
            <th>1</th>
            <td></td>
            <td><a href="#">Product 1</a></td>
            <td></td>                                                                        
            <td></td>
            <td></td>
            <td></td>
            <td><a href="#"><span class="icon has-text-danger"><i class="fa fa-lg fa-times-circle"></i></span></a></td>
          </tr> 
          <tr>
            <th>2</th>
            <td></td>
            <td><a href="#">Product 2</a></td>
            <td></td>                                                                        
            <td></td>
            <td></td>
            <td></td>
            <td><a href="#"><span class="icon has-text-danger"><i class="fa fa-lg fa-times-circle"></i></span></a></td>
          </tr>               
        </tbody>
      </table>                        
    </section>
  </div>
</template>

<script>
  export default {}
</script>