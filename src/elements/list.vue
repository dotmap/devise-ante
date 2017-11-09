<script>
export default {
  name: 'ElementList',
  props: ['game', 'elements']
}
</script>

<template>
  <at-menu :router="true">
    <at-menu-item v-for="e in $props.elements" :key="e.slug" :to="{ path: `/${$props.game}/${e.slug}` }">{{e.name}}</at-menu-item>
    <at-menu-item :to="{ name: 'newelement' }"><i class="icon icon-plus-circle"></i>new element</at-menu-item>
  </at-menu>
</template>

<style lang="scss" scoped>
  .at-menu {
    overflow-y: scroll;
  }
</style>
