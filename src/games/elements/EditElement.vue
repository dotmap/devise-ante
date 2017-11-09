<script>
export default {
  name: 'EditElement',
  props: ['game', 'slug'],
  computed: {
    name () { return this.$store.getters.element(this.game, this.slug).name },
    text () { return this.$store.getters.element(this.game, this.slug).text }
  }
}
</script>

<template>
  <div class="edit-element">
    <at-input :value="name" placeholder="name"/>
    <at-textarea :value="text" placeholder="description"/>
  </div>
</template>

<style lang="scss" scoped>
  div.edit-element {
    flex-grow: 1;
    display: flex;
    flex-flow: column;
    padding: 1rem;
    background: #eee;
    .at-textarea {
      flex-grow: 1;
      margin-top: 1rem;
      /deep/ textarea {
        height: 100%;
      }
    }
  }
</style>
