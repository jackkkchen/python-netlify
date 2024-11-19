<template>
  <div class="relative w-full rounded-lg rounded-md border border-solid  dark:border-gray-700">
    <div class="grid w-full" 
    :class="{'grid-cols-2':!$props.showInCol, 'gap-x-2':!$props.showInCol,
             'grid-cols-1':$props.showInCol, 'gap-y-0':$props.showInCol}">
      <div class="card h-full" :class="{'border-r':!$props.showInCol, 'rounded-sm':$props.showInCol, 'border-b':$props.showInCol}">
        <div class="card-header">
          <button class="btn cursor-default font-semibold">
              Source code:
          </button>
          <button class="btn" @click="copyCodeToClipboard">
              Copy
          </button>
          <button @click="executeCode" 
          class="btn float-right"
          :class="{'btn-success': pyodideStore.initialized, 'btn-initializing': !pyodideStore.initialized}">
              {{ pyodideStore.isRunningPython?'Running...':(pyodideStore.initialized?'Run code':'Initializing interpreter')}}{{  }}
          </button>
        </div>
          <Codemirror
            ref="codemirror"
            v-model="code"
            :extensions="extensions"
            placeholder="Enter your code here..."
            :disabled="!props.editable"
            :basic-setup="true"
            :indent-with-tab="true"
            style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;"
            theme={githubLight}
            :style="{'max-height': props.maxHeight}"
          />
      </div>
      <div class="card" :class="{'border-l':!$props.showInCol, 'rounded-sm':$props.showInCol}">
        <div class="card-header">
          <button class="btn cursor-default font-semibold">
            Run result:
          </button>
        </div>
        <div class="py-4 px-4 bg-transparent overflow-x-auto w-full"
             :style="{'max-height': props.maxHeight}">
          <client-only>
            <div class="text-xs leading-4 m-0 whitespace-pre font-mono">{{ execReturn }}</div>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { python } from '@codemirror/lang-python';
import { Codemirror } from 'vue-codemirror';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
const colorMode = useColorMode()
const extensions = ref([python(),githubLight,githubDark])

const slots = useSlots();
const pyodideStore = usePyodideStore();

const props = defineProps({
  editable: {
    type: Boolean,
    default: true
  },
  maxHeight: {
    type: String,
    default: '20rem',
  },
  showInCol: {
    type: Boolean,
    default: false
  }
})

// Watch ColorMode chage and update codemirror theme 监听ColorMode变化以更新代码编辑器的主题
watch(
  colorMode,
  () => {
    extensions.value = colorMode.value === 'dark' ? [python(), githubDark] : [python(),githubLight]
  }, { immediate: true }
)
 
// Get initial code and Init execuate return 获取初始代码，初始化执行结果
const code = ref(slots.default()[0].props.code)
const execReturn = ref('\n')

const executeCode = async ()=>{
  pyodideStore.isRunningPython = true
  execReturn.value = ''

  try {
    await pyodideStore.runPythonAsync(code.value).then(data=>{
      execReturn.value = data
    })
  } catch (error) {
    console.error("Error executing Python code:", error)
    execReturn.value = `Error: ${error.message}`
  } finally {
    pyodideStore.isRunningPython = false
  }
}

// 复制代码编辑器中的代码到剪贴板
const copyCodeToClipboard = () => {
  navigator.clipboard.writeText(code.value)
}
</script>

<style>
.btn {
  @apply px-2 py-1.5 rounded-md text-sm focus:outline-none
}
.btn-success {
  background-color: var(--color-primary);
  color: white;
}
.btn-initializing {
  @apply border cursor-not-allowed
}

.card {
  @apply rounded-md border-solid dark:border-gray-700 bg-[--pre-bg]
}

.card-header {
  @apply px-2 py-2 border-b border-gray-200 dark:border-gray-700 bg-[--bg]
}

.btn-outline-dark {
@apply border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white;
}

.btn-success {
@apply bg-green-500 text-white hover:bg-green-600;
}

.btn-warning {
@apply bg-yellow-500 text-white hover:bg-yellow-600;
}

.code-editor {
height: 400px;
}

.cm-line{
  line-height: 1.5;
}
</style>