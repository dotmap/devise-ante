<script>
export default {
  name: 'Editor',
  props: ['game', 'slug'],
  computed: {
    element () { return this.$store.getters.element(this.$props.game, this.$props.slug) },
    name () { return this.element && this.element.name },
    text () { return this.element && this.element.text }
  }
}
</script>

<template>
  <div class="element-editor">
    <at-input :value="name"></at-input>
    <at-textarea :value="text" :minRows="4"></at-textarea>
  </div>
</template>

<style lang="scss" scoped>
  .element-editor {
    height: 100%;
    flex-grow: 1;
    background: rgba(200, 200, 255, 0.5);
  }
</style>
