<template>
  <div>
    <section class="section no-top-pad">  
      <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <h5 class="title is-5">Add Product</h5>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <nuxt-link class="button" to="/admin/product-list">Back</nuxt-link> 
            </div>
          </div>
        </nav>
      <hr>

      <div class="columns">
        <div class="column is-one-third">
          <label class="label">Product image</label>
          <div class="file has-name is-fullwidth">                        
            <label class="file-label">
              <input class="file-input" type="file" name="resume">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-upload"></i>
                </span>
                <span class="file-label">
                  Upload
                </span>
              </span>
              <span class="file-name">
                product.jpg
              </span>
            </label>
          </div>          
          <br>
          <p class="image is-4by3">
            <img src="https://placehold.it/800x600">
          </p>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Product Name*</label>
            <div class="control">
              <input class="input" type="text" name="name">
            </div>
          </div>
          <div class="field">
            <label class="label">Code*</label>
            <div class="control">
              <input class="input" type="text" name="code">
            </div>
          </div>
          <div class="field">
            <label class="label">Brand*</label>
            <div class="control">
              <input class="input" type="text" name="brand">
            </div>
          </div>
          <div class="field">
            <label class="label">Price*</label>
            <div class="control">
              <input class="input" type="number" name="price">
            </div>
          </div>
          <div class="field">
            <label class="label">Stock*</label>
            <div class="control">
              <input class="input" type="number" name="stock">
            </div>
          </div>
          <div class="field">
            <label class="label">Belongs in*</label>
            <div class="control">
              <div class="select is-multiple">
                <select multiple size="3" name="belongs">                  
                  <option>Drone</option>
                  <option>Helicopter</option>
                </select>                
              </div>              
            </div>
          </div> 
          <div class="field">
            <label class="label">Status*</label>
            <div class="control">
              <div class="select">
                <select>
                  <option>Available</option>
                  <option>Not Available</option>
                </select>
              </div>
            </div>
          </div>  
          <div class="field">
            <label class="label">Detail</label>
            <div class="control">
              <textarea class="textarea"></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary">Submit</button>
            </div>                    
          </div>
        </div>                
      </div>                        
  </section>
  </div>
</template>

<script>
  export default {}
</script>