<script>
import slugify from 'slugify'

export default {
  name: 'NewGame',
  data () {
    return {
      base: location.origin,
      name: '',
      slug: ''
    }
  },
  computed: {
    defaultSlug: s => slugify(s.name, {lower: true})
  }
}
</script>

<template>
  <div class="newgame view">
    <h1>create a new game</h1>
    <p>This is a placeholder for some sort of explaination. We might explain how games should correspond to projects or recommend something.</p>
    <el-input v-model="name" placeholder="name your new game" size="large"></el-input>
    <code class="slug-preview">{{base}}/#/{{slug || defaultSlug}}</code>
    <el-button type="primary">create</el-button>
    <el-button>cancel</el-button>
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
