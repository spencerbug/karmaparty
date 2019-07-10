<template>
  <div>
    <section class="section no-top-pad">  
      <h5 class="title is-5">User groups</h5><hr>

      <div class="columns">
        <div class="column is-one-third">
          <div class="field">
            <label class="label">New user group</label>
            <div class="control">
              <input class="input" type="text" name="usergroup">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary">Create</button>
            </div>                    
          </div>
        </div>
        <div class="column">
          <table class="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>User group</th>
                <th>&nbsp;</th>
              </tr>
            </thead>  
            <tbody>
              <tr>
                <th>1</th>
                <td><a href="#">Administrator</a></td>
                <td><a href="#"><span class="icon has-text-danger"><i class="fa fa-lg fa-times-circle"></i></span></a></td>
              </tr>
              <tr>
                <th>2</th>
                <td><a href="#">Customer</a></td>
                <td><a href="#"><span class="icon has-text-danger"><i class="fa fa-lg fa-times-circle"></i></span></a></td>
              </tr>
            </tbody>
          </table>
        </div>                
      </div>                        
    </section>
  </div>
</template>

<script>
  export default {}
</script>