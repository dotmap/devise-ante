<script>
import uuid from 'uuid'
import ElementNav from './elements/ElementNav.vue'
import EditElement from './elements/EditElement.vue'
import GameSettings from './GameSettings.vue'

function randomHexColor () {
  const low = 0xCC
  const range = 0xFF - low
  return '#' +
    Math.floor(Math.random() * range + low).toString(16) +
    Math.floor(Math.random() * range + low).toString(16) +
    Math.floor(Math.random() * range + low).toString(16)
}

export default {
  name: 'Game',
  components: {
    ElementNav,
    EditElement,
    GameSettings
  },
  props: {
    game: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      nextTag: '',
      tagQuery: ''
    }
  },
  computed: {
    element () {
      const {game} = this
      return game.elements.find(e => e.id === this.id)
    },
    tags () {
      const {game, element} = this
      return element.tags.map(id => game.tags.find(t => t.id === id))
    },
    types () {
      return this.game.types
    },
    availableTags () {
      const {element, tagQuery} = this
      return this.game.tags
        .filter(t => element.tags.indexOf(t.id) === -1)
        .filter(t => t.title.toLowerCase().indexOf(tagQuery.toLowerCase()) > -1)
    }
  },
  methods: {
    createElement () {
      const {gameId, nextElement} = this.game
      const id = `${nextElement}`
      const elem = {id, title: `Element ${id}`, markdown: ``, tags: []}
      this.game.elements.push(elem)
      this.game.nextElement++
      this.$router.push({name: 'game', params: {gameId, id}})
      this.$emit('change')
    },
    deleteElement ({id}) {
      const {gameId, elements, tags} = this.game
      this.game.elements = elements.filter(e => e.id !== id)
      this.game.tags = tags.filter(t => this.game.elements.find(e => e.tags.find(id => id === t.id)))
      this.$router.push({ name: 'game', params: {gameId} })
      this.$emit('change')
    },
    setTagColor (id, color) {
      const tag = this.tags.find(t => t.id === id)
      tag.color = color
      this.$emit('change')
    },
    filterTags (query) {
      this.tagQuery = query
    },

    // current element actions

    setMarkdown (markdown) {
      this.element.markdown = markdown
      this.$emit('change')
    },

    createTag () {
      const {tags} = this.game
      const {element, nextTag} = this
      if (typeof nextTag === 'object') {
        element.tags.push(nextTag.id)
        this.$emit('change')
      } else if (tags.find(t => t.title.toLowerCase() === nextTag.toLowerCase())) {
        this.$message({message: 'Tag already exists.', type: 'warning'})
      } else {
        const id = uuid.v1()
        const color = randomHexColor()
        const title = nextTag
        tags.push({id, color, title})
        element.tags.push(id)
        this.$emit('change')
        this.$message({message: `"${title}" tag created.`, type: 'success'})
      }
      setImmediate(() => {
        this.nextTag = ''
        this.$refs.TagEntry.focus()
      })
    },

    removeTag (tagId) {
      const {element} = this
      const i = element.tags.findIndex(t => t === tagId)
      element.tags.splice(i, 1)

      const {elements, tags} = this.game
      const used = elements.find((e) => e.tags.find(t => t === tagId))
      if (!used) {
        const {title} = tags.find(t => t.id === tagId)
        this.game.tags = tags.filter(t => t.id !== tagId)
        this.$message({message: `"${title}" tag removed.`, type: 'warning'})
      }

      this.$emit('change')
    }
  }
}
</script>

<template>
  <el-container>

    <el-aside width="240px">
      <element-nav
        :gameId="game.gameId"
        :elements="game.elements"
        @create="createElement"
        @delete="deleteElement" />
    </el-aside>

    <el-main v-if="element">

      <el-form :inline="true" :model="element" size="mini">

        <router-link :to="{ name: 'game', params: {gameId: game.gameId} }">
          <i class="el-icon-d-arrow-left"></i><i class="el-icon-setting"></i>
        </router-link>

        <el-form-item label="Title">
          <el-input
            v-model="element.title"
            placeholder="Element Title"
            @change="$emit('change')"/>
        </el-form-item>

        <el-form-item label="Type" class="type-input">
          <el-select
            size="mini"
            default-first-option
            placeholder="New Tag..."
            v-model="element.typeId"
            @change="$emit('change')">
            <el-option
              v-for="type in types"
              :key="type.id"
              :label="type.title"
              :value="type.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Tags">
          <el-select
            size="mini"
            filterable
            remote
            reserve-keyword
            allow-create
            default-first-option
            placeholder="New Tag..."
            loading-text="Loading"
            no-data-text="No data"
            no-match-text="No match"
            ref="TagEntry"
            v-model="nextTag"
            :loading="false"
            :remote-method="filterTags"
            @change="createTag">
            <el-option
              v-for="tag in availableTags"
              :key="tag.id"
              :label="tag.title"
              :value="tag">
            </el-option>
          </el-select>

        </el-form-item>

        <el-popover
          v-for="{id, title, color} in tags"
          :key="id"
          placement="top"
          trigger="click">

          <el-color-picker
            :value="color"
            @active-change="c => setTagColor(id, c)"
          />

          <el-tag
            disable-transitions
            slot="reference"
            type="info"
            size="small"
            closable
            :color="color"
            @close="removeTag(id)">
            {{title}}
          </el-tag>

        </el-popover>

        <el-tag v-if="element.tags.length === 0" size="small" type="info">Untagged</el-tag>
      </el-form>

      <edit-element :markdown="element.markdown" @edit="setMarkdown"/>
    </el-main>

    <el-main v-else>
      <game-settings :game="game" @change="$emit('change')"/>
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

      .el-tag {
        margin: 2px;
        cursor: pointer;
      }

      .edit-element {
        flex-grow: 1;
        margin-top: 4px;
      }

      form a {
        margin: 0 .5rem;
      }

      .el-form-item {
        margin: 0 1rem 0 0;
      }

      .el-input, .el-select {
        /deep/ input {
          width: 120px;
        }
      }
    }
  }
</style>
