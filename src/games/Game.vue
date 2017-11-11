<script>
import ElementNav from './elements/ElementNav.vue'

export default {
  name: 'Game',
  props: ['game'],
  components: {
    ElementNav
  },
  computed: {
    elements () {
      return this.$store.getters.game(this.game).elements
    }
  }
}
</script>

<template>
  <div class="view">
    <element-nav :game="game" :elements="elements"></element-nav>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
  .view {
    flex-grow: 1;
    width: 100%;
    display: flex;
  }
</style>
