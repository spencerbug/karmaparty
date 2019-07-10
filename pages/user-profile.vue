<template>
  <div>
    <section class="section no-top-pad">  
        <h5 class="title is-5">Profile</h5><hr>
        
        <div class="columns is-centered is-mobile">
          
          <div class="column is-half-desktop is-full-mobile is-full-tablet">
            <form>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" name="fullname">
                </div>
              </div> 
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="email" name="email">
                </div>
              </div>                
              <div class="field">
                <div class="control">
                  <button type="submit" class="button is-primary">Update</button>
                </div>                    
              </div>
            </form>
          </div>   
                 
      </div>
    </section>
  </div>  
</template>

<script>
  export default {}
</script>