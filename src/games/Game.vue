<script>
import ElementNav from './elements/ElementNav.vue'
import EditElement from './elements/EditElement.vue'

const save = s => localStorage.setItem('elements', JSON.stringify(s))
const load = () => JSON.parse(localStorage.getItem('elements') || false) || [
  {
    slug: 'player-rovs',
    title: 'ROVs',
    markdown: `# ROVs\n\nThe core game mechanic is driving remotely operated vehicles around a two-dimensional map.\n`
  },
  {
    slug: 'player-views',
    title: 'Views',
    markdown: 'Views are the actual visuals of the game, and have types like sonar or something.'
  },
  {
    slug: 'defenses',
    title: 'ROV Defense Upgrades',
    markdown: 'You can get upgrades for your robots.\n\nSometime soon this will support markdown.\n'
  }
]

export default {
  name: 'Game',
  components: {
    ElementNav,
    EditElement
  },
  props: ['game', 'slug'],
  data () {
    return {
      elements: load()
    }
  },
  computed: {
    safeMarkdown () {
      if (!this.slug) return null
      const element = this.elements.find(e => e.slug === this.slug)
      return element && element.markdown
    }
  },
  methods: {
    onEdit (markdown) {
      this.elements.find(e => e.slug === this.slug).markdown = markdown
      save(this.elements)
    },
    onNew ({title, slug}) {
      console.log('onNew')
      const {game} = this
      this.elements.push({title, slug, markdown: ''})
      save(this.elements)
      this.$router.push({ name: 'element', params: {game, slug} })
    },
    del ({slug}) {
      const {game} = this
      this.elements = this.elements.filter(e => e.slug !== slug)
      save(this.elements)
      this.$router.push({ name: 'game', params: {game} })
    }
  }
}
</script>

<template>
  <div class="view">
    <element-nav :game="game" :elements="elements" @delete="del"/>
    <router-view :markdown="safeMarkdown" @edit="onEdit" @new="onNew"/>
  </div>
</template>

<style lang="scss" scoped>
  .view {
    flex-grow: 1;
    width: 100%;
    display: flex;
    // necessary for router-view's vertical scrolling
    height: calc(100% - 61px);
  }
</style>
