<template>
  <div class="relative [&>div:last-child]:!my-0 [&>div:last-child]:!static my-5">
    <div class="flex items-center gap-1 border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md overflow-hidden p-2">
      <button v-for="(vnode, index) in $slots.default()" :key="index" @click="handleClickButton(index)"
      class="px-2 py-1.5 focus:outline-none text-sm rounded-md flex items-center gap-1.5 "
      :class="{'bg-slate-100 dark:bg-gray-800': activeIndex === index,
              'hover:bg-gray-50 dark:hover:bg-gray-800': activeIndex !== index}">
        <span class="iconify i-vscode-icons:file-type-vue">
          {{ vnode.props.filename || vnode.props.label }}
        </span>
      </button>
    </div>
    <button v-if="! $slots.default()[activeIndex].props.label" type="button" class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-xs gap-x-1.5 p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center absolute top-2.5 right-2.5" aria-label="Copy code to clipboard" tabindex="-1">
      <span class="iconify i-heroicons:clipboard-document flex-shrink-0 h-4 w-4" aria-hidden="true" style="">
      </span>
    </button>
    <component :is="$slots.default()[activeIndex]" class="rounded-t-none">
    </component>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots(); // 获取所有插槽
const activeIndex = ref(0)

const handleClickButton = (index: number) => {
  activeIndex.value = index
  console.log()
}
</script>

<style scoped>
.code-block {
  margin: 1em 0;
}
.code-header {
  font-weight: bold;
}
</style>
