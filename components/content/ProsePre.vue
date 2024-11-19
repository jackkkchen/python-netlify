<template>
  <div class="relative">
    <div v-if="meta !== 'noTag' && filename"  class="flex items-center gap-1.5 border border-gray-200 dark:border-gray-700 border-b-0 relative rounded-t-md px-4 py-3 not-prose">
      <span class="iconify i-vscode-icons:file-type-markdown" aria-hidden="true" dynamic="">
      </span>
      <span class="text-gray-700 dark:text-gray-200 text-sm/6">
        {{ filename }}
      </span>
    </div>
    <!-- 这里是在代码框右上角的复制按钮 -->
    <button @click="copyCode"
    type="button" class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-xs gap-x-1.5 p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center absolute top-2.5 right-2.5" aria-label="Copy code to clipboard" tabindex="-1">
      <span class="iconify i-heroicons:clipboard-document flex-shrink-0 h-4 w-4" aria-hidden="true" style="">
        {{ copied ? 'Done' : 'Copy' }}
      </span>
    </button>
    <pre :class="{'rounded-t-none': meta !== 'noTag' && filename, [$props.class]:true}" class="my-0 border rounded border-gray-200 dark:border-gray-700"><slot /></pre>
  </div>
</template>
  
<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
const { copy, copied } = useClipboard()
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  },
  showPath: {
    type: Boolean,
    default: false
  }
})

const copyCode = () => {
  copy(props.code)
}
</script>

<style>
pre code .line {
  display: block;
}
</style>