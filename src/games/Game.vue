<script>
import ElementNav from './elements/ElementNav.vue'
import EditElement from './elements/EditElement.vue'

const save = s => localStorage.setItem('elements', JSON.stringify(s))
const load = () => JSON.parse(localStorage.getItem('elements') || '[]')

export default {
  name: 'Game',
  components: {
    ElementNav,
    EditElement
  },
  props: {
    gameId: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      localList: load()
    }
  },
  computed: {
    element () {
      return this.localList.find(e => e.id === this.id)
    },
    nextId () {
      return `${this.localList.length + 1}`
    }
  },
  methods: {
    saveLocal () {
      save(this.localList)
    },
    create () {
      const {gameId, nextId} = this
      this.localList.push({id: nextId, title: nextId, markdown: `# ${nextId}\n\n`})
      this.saveLocal()
      this.$message({type: 'success', message: `Created Element ${nextId}`})
      this.$router.push({name: 'game', params: {gameId, id: nextId}})
    },
    del ({id}) {
      const {gameId} = this
      const i = this.localList.findIndex(e => e.id === id)
      this.localList.splice(i, 1)
      this.saveLocal()
      this.$message({ type: 'success', message: 'Deleted' })
      this.$router.push({ name: 'game', params: {gameId} })
    },
    onEdit (markdown) {
      this.element.markdown = markdown
      this.saveLocal()
    }
  }
}
</script>

<template>
  <el-container>
    <el-aside width="240px">
      <element-nav :gameId="gameId" :elements="localList" @create="create" @delete="del"/>
    </el-aside>
    <el-main>
      <edit-element v-if="element" :markdown="element.markdown" @edit="onEdit"/>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
  .el-container {
    .el-aside {
      overflow: inherit;
    }
    .el-main {
      padding: 0;
      .edit-element {
        height: 100%;
      }
    }
  }
</style>
