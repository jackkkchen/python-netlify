<template>
  <div class="mermaid-wrapper">
    <pre class="mermaid">
      {{ diagram }}
    </pre>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import mermaid from 'mermaid'

const props = defineProps({
  diagram: {
    type: String,
    required: true
  }
})

onMounted(() => {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
  })
})
</script>

<style>
.mermaid-wrapper {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.mermaid {
  background-color: transparent !important;
}
</style>