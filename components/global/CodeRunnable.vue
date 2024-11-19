<template>
  <div class="relative" of-x-scroll flex-none>
    <div
      transition-all duration-500 
      v-html="output"
      class="w-full h-full bg-transparent"
      :class="$props.class"
    />
    <textarea
      id="input"
      v-model="input"
      class="absolute top-0 left-0 inset-0  dark:caret-white w-full h-full resize-none of-hidden p4 bg-transparent z-1 font-mono text-transparent"
      spellcheck="false"
      style="caret-color: gray;"
    />
  </div>
  <button>运行</button>
</template>

<script setup>
import { createHighlighter } from 'shiki'
const slots = useSlots(); // 获取所有插槽
const colorMode = useColorMode()

const input = ref(slots.default()[0].props.code)
console.log()
const output = ref('')

let highlighter = null

highlighter = await createHighlighter({
  themes: ['github-dark', 'github-light'],
  langs: [slots.default()[0].props.language],
})

async function highlight() {
  let result = await highlighter.codeToHtml(input.value, {
    lang: slots.default()[0].props.language,
    theme: colorMode.value === 'dark' ? 'github-dark' : 'github-light',
    transformers: [
      {
        pre(node){
          node.properties['style'] = ''
        }
      }
    ]
  })
  output.value = result.replaceAll('</span></span>\n<span class="line"><s', '</span></span><span class="line"><s')
}

watch(
  input,
  () => {
    highlight()
  },
)

// Watch for color mode changes and update highlighting theme
watch(
  colorMode,
  () => {
    highlight()
  },
  { immediate: true, deep: true }
)

</script>

<style scoped>
:root {
  color-scheme: light;
}
:root.dark {
  color-scheme: dark;
}
.shiki, #input {
  font-size: 14px;
  line-height: 1.7142857;
  padding-top: 12px;
  padding-left: 16px;
  padding-bottom: 10px;
  padding-right: 16px;
  min-height: 4em;
  white-space: pre;
  border-width: 1px;
  border-color: #9ca3af4d;
  border-radius: .25rem;
}
.prose .shiki .github-dark pre{
  background-color: darkcyan !important;
}
.panel-info button {
  --uno: hover-text-primary hover-underline hover:op100;
}
pre code{
  line-height: 0;
}
.shiki .line {
  display: inline-block;
  line-height: 1;
  margin: 0;
  padding: 0;
}

</style>