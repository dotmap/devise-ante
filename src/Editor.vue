<script>
export default {
  name: 'Editor',
  props: ['game', 'slug'],
  computed: {
    element () { return this.$store.getters.element(this.$props.game, this.$props.slug) },
    name () { return this.element.name },
    text () { return this.element.text }
  }
}
</script>

<template>
  <div class="element-editor">
    <at-input :value="name"></at-input>
    <at-textarea :value="text"></at-textarea>
  </div>
</template>

<style lang="scss" scoped>
  .element-editor {
    height: 100%;
    flex-grow: 1;
    background: rgba(200, 200, 255, 0.5);
    .at-textarea {
      height: 50%;
      /deep/ textarea {
        resize: none;
        height: 100%;
      }
    }
  }
</style>
