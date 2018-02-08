<script>
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

export default {
  name: 'EditElement',
  props: {
    markdown: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.simplemde = new SimpleMDE({
      element: this.$refs.editor,
      initialValue: this.markdown,
      status: [
        {
          className: 'saved',
          defaultValue: function (el) {
            // this.keystrokes = 0;
            // el.innerHTML = "0 Keystrokes";
            el.innerHTML = 'Saved Locally'
          },
          onUpdate: function (el) {
            // el.innerHTML = ++this.keystrokes + " Keystrokes";
          }
        },
        'lines',
        'words'
      ]
    })
    this.simplemde.codemirror.on('change', () => {
      this.$emit('edit', this.simplemde.value())
    })
  }
}
</script>

<template>
  <div class="edit-element">
    <textarea class="editor" ref="editor" @input="$emit('input')"/>
  </div>
</template>
