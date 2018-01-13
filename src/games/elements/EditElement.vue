<script>
import Editor from 'tui-editor'
import 'tui-editor/dist/tui-editor-extScrollSync.min'
import 'tui-editor/dist/tui-editor-extColorSyntax.min'
import 'tui-editor/dist/tui-editor.min.css'
import 'tui-editor/dist/tui-editor-contents.min.css'

export default {
  name: 'EditElement',
  props: {
    markdown: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.editor = new Editor({
      el: this.$refs.editor,
      initialEditType: 'wysiwyg',
      initialValue: this.markdown || '',
      previewStyle: 'tab',
      height: '100%',
      exts: ['colorSyntax', 'scrollSync'],
      events: {
        change: () => {
          this.$emit('edit', this.editor.getValue())
        }
      }
    })
  }
}
</script>

<template>
  <div class="edit-element">
    <div class="editor" ref="editor"/>
  </div>
</template>

<style lang="scss" scoped>
  .edit-element {
    display: flex;
    .editor { flex-grow: 1; }
  }
</style>
