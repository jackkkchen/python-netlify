<template>
  <div class="p-4 rounded-lg">
    <div class="flex items-start space-x-3">
      <img :src="userAvatar" alt="Your Avatar" class="w-10 h-10 rounded-full">
      <div class="flex-grow">
        <textarea 
          v-model="content" 
          :placeholder="placeholder"
          :rows="content.split(/\r\n|\r|\n/).length>=2?content.split(/\r\n|\r|\n/).length:2" 
          class="w-full p-2 border border-gray-300 rounded-md h-auto
          hover:outline-none hover:ring-2 hover:ring-blue-500
          bg-slate-100 hover:bg-white resize-none overflow-hidden
          placeholder:leading-[3rem] leading-[1.5rem]"
          @input="handleInput"
          @blur="handleBlur"
          @click="activate"
        ></textarea>
        <div v-if="isActive" class="flex justify-between items-center mt-2">
          <div class="flex items-center space-x-2">
            <div class="text-sm text-gray-500">{{ content.length }}/1000</div>
            <EmojiPicker @select="addEmoji" />
            <input
              type="file"
              accept="image/*"
              @change="uploadImage"
              class="hidden"
              ref="imageInput"
            >
            <button
              @click="$refs.imageInput.click()"
              class="text-blue-500 hover:text-blue-600 focus:outline-none"
            >
              上传图片
            </button>
          </div>
          <button 
            @click="submitComment" 
            class="px-8 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            {{ submitButtonText }}
          </button>
        </div>
        <div v-if="imageUrl" class="mt-2">
          <img :src="imageUrl" alt="Uploaded image" class="max-w-full h-auto rounded-md">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import EmojiPicker from './EmojiPicker.vue'

const props = defineProps({
  userAvatar: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Post a friendly comment (Markdown syntax supported)'
  },
  submitButtonText: {
    type: String,
    default: 'Post'
  }
})

const emit = defineEmits(['submit'])

const content = ref('')
const imageUrl = ref(null)
const isActive = ref(false)

const activate = () => {
  isActive.value = true
}

const handleInput = () => {
  validateCommentLength()
}

const handleBlur = () => {
  if (content.value.trim() === '' && !imageUrl.value) {
    isActive.value = false
  }
}

const validateCommentLength = () => {
  const maxLength = 1000
  if (content.value.length > maxLength) {
    content.value = content.value.slice(0, maxLength)
  }
}

const addEmoji = (emoji) => {
  content.value += emoji
}

const uploadImage = async (event) => {
  const file = event.target.files[0]
  if (file) {
    // 这里应该是一个真实的API调用来上传图片
    // const formData = new FormData()
    // formData.append('image', file)
    // const response = await fetch('/api/upload-image', {
    //   method: 'POST',
    //   body: formData
    // })
    // const data = await response.json()
    // imageUrl.value = data.imageUrl

    // 模拟图片上传
    imageUrl.value = URL.createObjectURL(file)
    content.value += `\n\n![Uploaded Image](${imageUrl.value})`
  }
}

const submitComment = () => {
  if (content.value.trim() || imageUrl.value) {
    emit('submit', { content: content.value, imageUrl: imageUrl.value })
    content.value = ''
    imageUrl.value = null
    isActive.value = false
  }
}

// 监听内容变化，如果内容为空且没有图片，则恢复未激活状态
watch([content, imageUrl], ([newContent, newImageUrl]) => {
  if (newContent.trim() === '' && !newImageUrl) {
    isActive.value = false
  } else {
    isActive.value = true
  }
})
</script>