<script>
export default {
  name: 'Editor'
}
</script>

<template>
  <div class="element-editor">
    <h1>Editor</h1>
    <h2>game {{$route.params.game}}</h2>
    <h2>element {{$route.params.id}}</h2>
  </div>
</template>

<style lang="scss" scoped>
  .element-editor {
    height: 100%;
    flex-grow: 1;
    background: rgba(200, 200, 255, 0.5);
  }
</style>
