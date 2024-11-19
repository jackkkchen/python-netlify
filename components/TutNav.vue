<template>
  <nav v-if="nav" class="space-y-3">
    <div class="w-full flex flex-col space-y-3">
      <div class="w-full flex flex-col space-y-3">
        <ul class="space-y-2">
          <li v-for="link in nav" :key="link._path"
          :class="{ 'text-primary font-semibold': isActive(link._path) }">
            <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
  
<script setup>
defineProps({
  nav: {
  },
})

const route = useRoute()

const isActive = computed(() => (path) => {
  console.log(route)
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
})
</script>