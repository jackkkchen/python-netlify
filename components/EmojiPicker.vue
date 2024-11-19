<template>
    <div class="relative">
      <button @click="togglePicker" class="text-gray-500 hover:text-blue-500 focus:outline-none">
        😊
      </button>
      <div v-if="isOpen" class="absolute bottom-8 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
        <button 
          v-for="emoji in emojis" 
          :key="emoji"
          @click="selectEmoji(emoji)"
          class="p-1 hover:bg-gray-100 rounded"
        >
          {{ emoji }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const emojis = ['😊', '😂', '🤔', '👍', '❤️', '😎', '🎉', '🌟', '🤩', '😍']
  const isOpen = ref(false)
  
  const togglePicker = () => {
    isOpen.value = !isOpen.value
  }
  
  const selectEmoji = (emoji) => {
    emit('select', emoji)
    isOpen.value = false
  }
  
  const emit = defineEmits(['select'])
  </script>