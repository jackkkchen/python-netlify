<template>
  <nav v-if="toc" class="sticky top-[--header-height] bg-background/75 backdrop-blur -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))]">
    <div class="py-3 lg:py-8 border-b border-dashed border-gray-200 dark:border-gray-800 lg:border-0 space-y-3">
      <button class="flex items-center gap-1.5 lg:cursor-text lg:select-text w-full group" tabindex="-1">
        <span class="font-semibold text-sm/6 truncate">
          Table of Contents
        </span>
        <span class="iconify i-heroicons:chevron-down-20-solid lg:!hidden w-5 h-5 ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 -rotate-90" aria-hidden="true" style="">
        </span>
      </button>
      <!--  -->
      <ul class="space-y-1 hidden lg:block">
        <li v-for="link in toc.links" :key="link.id">
          <a :href="`#${link.id}`" class="text-sm font-medium">{{ link.text }}</a>
          <ul v-if="link.children" class="ml-4 mt-2 space-y-2">
            <li v-for="childLink in link.children" :key="childLink.id" class="space-y-1 hidden lg:block">
              <a :href="`#${childLink.id}`" class="text-sm">{{ childLink.text }}</a>
            </li>
          </ul>
        </li>
      </ul>
      <!--  -->
      <div class="hidden !mt-6 lg:block space-y-6">
        <div class="flex items-center align-center text-center w-full flex-row">
          <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-dashed">
          </div>
        </div>
        <!--  -->
        <div class="space-y-3">
        <p class="text-sm/6 font-semibold flex items-center gap-1.5">
          Reference
        </p>
        <div class="space-y-3 lg:space-y-1.5">
          <a class="flex items-center gap-1.5" href="/" >
            <span class="text-sm/6 font-medium relative">
              Video Link
            </span>
          </a>
          <a class="flex items-center gap-1.5" href="/" >
            <span class="text-sm/6 font-medium relative">
              Advertisement Space
            </span>
          </a>
        </div>
      </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  toc: {
  },
})
</script>