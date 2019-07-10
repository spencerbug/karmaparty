<template>
  <div>
    <section class="section no-top-pad">  
      <h5 class="title is-5">Shopping Cart</h5><hr>
        
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th class="has-text-centered">Quantity</th>    
            <th class="has-text-right">Price</th>                   
            <th class="has-text-right">Amount</th>
          </tr>
        </thead>  
        <tbody class="cart">
          <tr>
            <td><img src="http://placehold.it/48x48" alt="Image"></td>
            <td>Product 1</td>
            <td class="has-text-centered">
              1
              <a class="button is-primary is-outlined is-small">
                <span class="icon is-small">
                  <i class="fa fa-plus"></i>
                </span>
              </a>
              <a class="button is-danger is-outlined is-small">
                <span class="icon is-small">
                  <i class="fa fa-minus"></i>
                </span>
              </a>
            </td>
            <td class="has-text-right">$123.90</td>
            <td class="has-text-right">$123.90</td>
          </tr> 
          <tr>
            <td><img src="http://placehold.it/48x48" alt="Image"></td>
            <td>Product 2</td>
            <td class="has-text-centered">
              2
              <a class="button is-primary is-outlined is-small">
                <span class="icon is-small">
                  <i class="fa fa-plus"></i>
                </span>
              </a>
              <a class="button is-danger is-outlined is-small">
                <span class="icon is-small">
                  <i class="fa fa-minus"></i>
                </span>
              </a>
            </td>
            <td class="has-text-right">$123.90</td>
            <td class="has-text-right">$123.90</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="has-text-right"><strong>Total <span class="cart-total">$246.90</span></strong></td>
          </tr>               
        </tbody>
      </table> 
      
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <nuxt-link class="button is-info" to="/">Back to Shopping</nuxt-link>
        </div>
        <div class="control">
          <a class="button is-primary" href="#">Checkout</a>
        </div>
      </div>
              
    </section>
  </div>
</template>

<script>
  export default {}
</script>