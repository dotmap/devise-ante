<script>
import uuid from 'uuid'
import ElementNav from './elements/ElementNav.vue'
import EditElement from './elements/EditElement.vue'

const load = () => {
  return JSON.parse(localStorage.getItem('daba') || 'false') || {
    elements: [],
    nextElement: 1,
    tags: []
  }
}

const save = s => {
  const state = load()
  Object.assign(state, s)
  localStorage.setItem('daba', JSON.stringify(state))
}

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
    return Object.assign(load(), {
      loading: false,
      nextTag: '',
      query: ''
    })
  },
  computed: {
    element () {
      return this.elements.find(e => e.id === this.id)
    },
    availableTags () {
      const {tags, element, query} = this
      return tags
        .filter(t => element.tags.indexOf(t.id) === -1)
        .filter(t => t.title.toLowerCase().indexOf(query.toLowerCase()) > -1)
    }
  },
  methods: {
    save () {
      const {tags, elements, nextElement} = this
      save({elements, tags, nextElement})
    },
    create () {
      const {gameId, elements, nextElement} = this
      const id = `${nextElement}`
      elements.push({id, title: `Element ${id}`, markdown: ``, tags: []})
      this.nextElement++
      save({elements, nextElement: nextElement + 1})
      this.$message({type: 'success', message: `Created Element ${id}`})
      this.$router.push({name: 'game', params: {gameId, id}})
    },
    del ({id}) {
      const {gameId, elements, tags} = this
      const i = elements.findIndex(e => e.id === id)
      elements.splice(i, 1)

      const origTags = this.tags.length
      this.tags = tags.filter(t => elements.find(e => e.tags.find(id => id === t.id)))
      save({elements, tags: this.tags})

      this.$message({ type: 'success', message: `Deleted element and ${origTags - this.tags.length} tags.` })
      this.$router.push({ name: 'game', params: {gameId} })
    },
    setMarkdown (markdown) {
      const {elements} = this
      this.element.markdown = markdown
      save({elements})
    },
    tag (id) {
      return this.tags.find(e => e.id === id)
    },
    setTagColor (id, color) {
      this.tag(id).color = color
    },
    createTag () {
      const id = uuid.v1()
      const {nextTag, tags, elements, element} = this
      if (typeof nextTag === 'string') {
        element.tags.push(id)
        const low = 0xCC
        const range = 0xFF - low
        const color = '#' +
        Math.floor(Math.random() * range + low).toString(16) +
        Math.floor(Math.random() * range + low).toString(16) +
        Math.floor(Math.random() * range + low).toString(16)
        tags.push({id, title: nextTag, color})
        save({tags, elements})
        this.nextTag = ''
      } else {
        const tag = tags.find(t => t.id === nextTag.id)
        element.tags.push(tag.id)
        save({elements})
        this.nextTag = ''
      }
      setImmediate(() => this.$refs.TagEntry.focus())
    },
    removeTag (tag) {
      const {tags, elements, element} = this
      const i = element.tags.findIndex(t => t === tag)
      element.tags.splice(i, 1)

      const used = elements.find((e) => e.tags.find(t => t === tag))
      if (!used) {
        const i = tags.findIndex(t => t.id === tag)
        tags.splice(i, 1)
      }

      save({tags, elements})
    },
    remoteMethod (query) {
      this.query = query
    }
  }
}
</script>

<template>
  <el-container>
    <el-aside width="240px">
      <element-nav :gameId="gameId" :elements="elements" @create="create" @delete="del"/>
    </el-aside>
    <el-main v-if="element">
      <div class="meta">

        <el-input
          size="mini"
          v-model="element.title"
          placeholder="Element Title"
          @change="save"
        />

        <el-select
          ref="TagEntry"
          size="mini"
          v-model="nextTag"
          filterable
          remote
          reserve-keyword
          allow-create
          default-first-option
          placeholder="New Tag..."
          loading-text="Loading"
          no-data-text="No data"
          no-match-text="No match"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="createTag">
          <el-option
            v-for="tag in availableTags"
            :key="tag.id"
            :label="tag.title"
            :value="tag">
          </el-option>
        </el-select>

        <el-popover
          class="tag-edit"
          v-for="id in element.tags"
          :key="id"
          placement="top"
          trigger="click">
          <el-tag slot="reference"
            type="info"
            :color="tag(id).color"
            size="small"
            closable
            @close="removeTag(id)">
            {{tag(id).title}}
          </el-tag>
          <el-color-picker
            style="float:right"
            :value="tag(id).color"
            @active-change="c => setTagColor(id, c)"
          />
          <h2>{{tag(id).title}}</h2>
          <br>
          <code>{{id}}</code>
        </el-popover>

        <el-tag v-if="element.tags.length === 0" size="small" type="info">Untagged</el-tag>

      </div>
      <edit-element :markdown="element.markdown" @edit="setMarkdown"/>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
  .el-container {
    .el-aside {
      overflow: inherit;
    }
    .el-main {
      padding: 4px;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      flex-flow: column;

      .meta {
        .el-input {
          display: inline-block;
          width: 180px;
        }
        .el-select {
          width: 120px;
        }
        .el-tag {
          margin: 2px;
          cursor: pointer;
        }
      }

      .edit-element {
        flex-grow: 1;
        margin-top: 4px;
      }
    }
  }
</style>
