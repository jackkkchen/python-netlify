<template>
  <header class="bg-background backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl flex justify-between gap-3 h-[--header-height]">
      <div class="font-black lg:flex-1 flex items-center gap-1.5">
        <p> Learning Website </p>
        <ul class="ml-6 gap-x-8 hidden lg:flex">
          <li class="relative">
            <a class="text-sm/6 font-semibold flex items-center gap-1" href="/">
              Home
            </a>
          </li>
          <li class="relative">
            <a class="text-sm/6 font-semibold flex items-center gap-1" href="/python-zero">
              Python For Beginners
            </a>
          </li>
          <li class="relative">
            <a class="text-sm/6 font-semibold flex items-center gap-1" href="/mysql-zero">
              MySQL For Beginners
            </a>
          </li>
        </ul>
      </div>
      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <button type="button" @click="toggleColorMode" class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center">
          Light/Dark
        </button>
        <button type="button" class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center">
          Login
        </button>
        <button type="button" class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center lg:hidden">
          Expand
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>