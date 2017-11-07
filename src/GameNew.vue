<script>
import {yesRandom, noRandom} from 'yes-no-words'
import slugify from 'slugify'

export default {
  name: 'GameNew',
  data () {
    return {
      base: location.origin,
      name: '',
      slug: ''
    }
  },
  computed: {
    defaultSlug: s => slugify(s.name, {lower: true}),
    yes: () => yesRandom(),
    no: () => noRandom()
  }
}
</script>

<template>
  <div class="newgame view">
    <h1>create a new game</h1>
    <p>This is a placeholder for some sort of explaination. We might explain how games should correspond to projects or recommend something.</p>
    <at-input v-model="name" placeholder="name your new game" size="large"></at-input>
    <code class="slug-preview">{{base}}/#/{{encodeURI(slug || defaultSlug)}}</code>
    <at-button type="primary">{{yes}}</at-button>
    <at-button>{{no}}</at-button>
  </div>
</template>

<style lang="scss" scoped>
  .view {
    width: 480px;
    margin: 4rem auto;
    text-align: center;
    .at-input, p, .slug-preview {
      margin: 1rem 0;
    }
    .slug-preview {
      display: block;
    }
  }
</style>
