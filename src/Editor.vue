<script>
export default {
  name: 'Editor',
  props: ['slug']
}
</script>

<template>
  <div class="element-editor">
    <h1>Editor</h1>
    <h2>{{$route.params.game}}</h2>
    <h2>{{$props.slug}}</h2>
  </div>
</template>

<style lang="scss" scoped>
  .element-editor {
    height: 100%;
    flex-grow: 1;
    background: rgba(200, 200, 255, 0.5);
  }
</style>
