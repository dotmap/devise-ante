<script>
export default {
  name: 'ElementNav',
  props: {
    game: {
      type: String,
      required: true
    },
    elements: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      askingAbout: null,
      showAsk: false
    }
  },
  methods: {
    askAbout (e) {
      this.askingAbout = e
      this.showAsk = true
    },
    del (e) {
      this.$emit('delete', e)
      this.showAsk = false
    }
  }
}
</script>

<template>
  <el-menu :router="true">
    <el-dialog
      title="Delete"
      :visible.sync="showAsk"
      width="30%"
      :before-close="() => {showAsk = false}">
      <span>Delete {{askingAbout && askingAbout.title}}?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAsk = false">Cancel</el-button>
        <el-button type="danger" @click="del(askingAbout)">Confirm</el-button>
      </span>
    </el-dialog>

    <el-menu-item-group title="elements">
      <span
        v-for="e in elements"
        :key="e.slug"
        @contextmenu.prevent="askAbout(e)">
        <el-menu-item
          :index="e.slug"
          :route="{name: 'element', params: {game, slug: e.slug}}">
          {{e.title}}
        </el-menu-item>
      </span>
    </el-menu-item-group>
    <el-menu-item-group title="actions">
      <el-menu-item :route="{ name: 'newelement' }" index="newelement"><i class="el-icon-circle-plus"></i>new element</el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<style lang="scss" scoped>
  .el-menu {
    overflow-y: scroll;
    width: 240px;
    box-sizing: border-box;
    position: relative;
  }
</style>
