<template>
  <!-- vue js builtin transition component -->
  <transition name="slide" type="animation">
    <div class="notification is-danger" v-if="error">{{ error.message }}</div>
  </transition>
</template>


<script>
export default {
  props: ["error"]
};
</script>

<style lang="scss">
// styles for this are in /static/styles.css (for slide transitions)
</style>
