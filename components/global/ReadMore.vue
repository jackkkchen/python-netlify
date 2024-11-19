<template>
  <div class="block pl-4 pr-6 py-3 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm/6 my-5 last:mb-0 font-normal group relative prose-code:bg-white dark:prose-code:bg-gray-900 hover:border-[--color-light] dark:hover:border-[--color-dark] hover:text-[--color-light] dark:hover:text-[--color-dark] border-dashed hover:border-solid hover:text-gray-800 dark:hover:text-gray-200" 
  style="--color-light: rgb(var(--color-primary-DEFAULT)); --color-dark: rgb(var(--color-primary-DEFAULT));">
    <a :href="to" class="focus:outline-none" tabindex="-1">
      <span class="absolute inset-0" aria-hidden="true">
      </span>
    </a>
    <span class="iconify i-ph:bookmark-simple-duotone w-4 h-4 mr-2 inline-flex items-center align-sub text-[--color-light] dark:text-[--color-dark]" aria-hidden="true">

    </span>
    Read more in
    <span class="font-bold">
      {{ title }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Default title'
  },
  to: {
    type: String,
    default: 'link'
  },
})
</script>
