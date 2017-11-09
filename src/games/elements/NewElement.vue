<script>
import slugify from 'slugify'

export default {
  name: 'NewElement',
  props: ['game'],
  data () {
    return {
      name: '',
      slug: ''
    }
  },
  computed: {
    gameName () { return this.$store.getters.game(this.game) },
    defaultSlug: data => slugify(data.name, {lower: true})
  }
}
</script>

<template>
  <div class="new-element">
    <h2>create element</h2>
    <p>This is a markedly unique component of the game. A character, a place, technology from lore, or anything you could imagine needs to be described to other developers working the game.</p>
    <at-input v-model="name"></at-input>
    <code>{{slug || defaultSlug || 'slug-preview'}}</code>
    <at-button type="primary">create</at-button>
    <at-button><i class="icon icon-hash"></i></at-button>
    <at-button>cancel</at-button>
  </div>
</template>

<style lang="scss" scoped>
  .new-element {
    text-align: center;
    flex-grow: 1;
    padding: 4rem;
    h2, p, code {
      display: block;
      margin: 1rem 0;
      text-align: center;
    }
    /deep/ input {
      text-align: center;
    }
  }
</style>
