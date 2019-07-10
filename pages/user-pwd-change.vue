<template>
  <div>
    <section class="section no-top-pad">  
      <h5 class="title is-5">Password Change</h5><hr>
        
      <div class="columns is-centered is-mobile">        
        <div class="column is-half-desktop is-full-mobile is-full-tablet">
          <form>
            <div class="field">
              <label class="label">New password</label>
              <div class="control">
                  <input class="input" type="password" name="password">
              </div>
            </div>
            <div class="field">
              <label class="label">Confirm new password</label>
              <div class="control">
                  <input class="input" type="password_confirmation" name="password_confirmation">
              </div>
            </div>

            <div class="field">
              <div class="control">
                  <button class="button is-primary">Change Password</button>
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