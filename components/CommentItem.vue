<template>
    <div class="mb-6 pb-4 border-b border-gray-200">
      <div class="flex items-start">
        <img :src="comment.avatar" alt="User Avatar" class="w-10 h-10 rounded-full mr-3">
        <div class="flex-grow">
          <div class="flex items-center">
            <span class="font-bold text-blue-500">{{ comment.username }}</span>
            <span class="ml-2 text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
          </div>
          <div class="mt-1 text-gray-700" v-html="renderContent(comment.content)"></div>
          <div class="mt-2 flex items-center space-x-4">
            <button @click="likeComment" class="flex items-center text-gray-500 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" :class="{'text-blue-500': comment.liked}" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span>{{ comment.likes }}</span>
            </button>
            <button @click="toggleReplyInput" class="text-gray-500 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
              </svg>
              Reply ({{ comment.replyCount }})
            </button>
          </div>
          
          <!-- 回复输入框 -->
          <div v-if="showReplyInput">
            <CommentEditor
              :user-avatar="currentUserAvatar"
              placeholder="Reply to comment (Markdown syntax supported)"
              submit-button-text="Post Reply"
              @submit="submitReply"
            />
          </div>
          
          <!-- 回复列表 -->
          <div v-if="comment.replies && comment.replies.length > 0" class="mt-3 bg-gray-50 p-3 rounded-lg">
            <div v-for="reply in comment.replies" :key="reply.id" class="mb-2 last:mb-0">
              <div class="flex items-start">
                <img :src="reply.avatar" alt="User Avatar" class="w-6 h-6 rounded-full mr-2">
                <div>
                  <div class="flex items-center">
                    <span class="font-bold text-blue-500 text-sm">{{ reply.username }}</span>
                    <span class="ml-2 text-xs text-gray-500">{{ formatDate(reply.createdAt) }}</span>
                  </div>
                  <div class="mt-1 text-sm text-gray-700" v-html="renderContent(reply.content)"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 回复分页 -->
          <div v-if="comment.replyCount > 0" class="mt-2 flex justify-between items-center">
            <div class="text-sm text-gray-500">
              Page {{ currentReplyPage }} of {{ totalReplyPages }}
            </div>
            <div class="space-x-2">
              <button 
                @click="changePage(-1)" 
                :disabled="currentReplyPage === 1"
                class="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Last Page
              </button>
              <button 
                @click="changePage(1)" 
                :disabled="currentReplyPage === totalReplyPages"
                class="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
//   import { marked } from 'marked'
//   import DOMPurify from 'dompurify'
  import CommentEditor from './CommentEditor.vue'
  
  const props = defineProps({
    comment: {
      type: Object,
      required: true
    },
    currentUserAvatar: {
      type: String,
      required: true
    }
  })
  
  const emit = defineEmits(['like', 'reply', 'load-replies'])
  
  const showReplyInput = ref(false)
  const currentReplyPage = ref(1)
  const repliesPerPage = 5
  
  const totalReplyPages = computed(() => Math.ceil(props.comment.replyCount / repliesPerPage))
  
  const renderContent = (content) => {
    // marked.setOptions({
    //   headerIds: false,
    //   mangle: false
    // })
  
    // const renderer = new marked.Renderer()
    // renderer.heading = (text, level) => {
    //   if (level === 1) {
    //     return `<h1 class="text-xl font-bold my-2">${text}</h1>`
    //   }
    //   return `<p class="font-bold">${text}</p>`
    // }
  
    // const rawHtml = marked(content, { renderer })
    // return DOMPurify.sanitize(rawHtml)
    return content
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
  
    if (days > 0) return `${days}天前`
    if (hours > 0) return `${hours}小时前`
    if (minutes > 0) return `${minutes}分钟前`
    return '刚刚'
  }
  
  const likeComment = () => {
    emit('like', props.comment.id)
  }
  
  const toggleReplyInput = () => {
    showReplyInput.value = !showReplyInput.value
  }
  
  const submitReply = (replyData) => {
    emit('reply', { commentId: props.comment.id, ...replyData })
    showReplyInput.value = false
  }
  
  const changePage = (direction) => {
    const newPage = currentReplyPage.value + direction
    if (newPage >= 1 && newPage <= totalReplyPages.value) {
      currentReplyPage.value = newPage
      emit('load-replies', {
        commentId: props.comment.id,
        page: currentReplyPage.value,
        perPage: repliesPerPage
      })
    }
  }
  </script>