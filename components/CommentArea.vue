<template>
    <div class="mx-auto p-4 rounded-lg">
      <h2 id="comments" class="text-xl font-bold mb-4">Comments ({{ totalComments }})</h2>
      
      <!-- Bilibili-style sorting selection -->
      <div class="mb-4 flex items-center space-x-4 text-sm">
        <span class="text-gray-600">Sort by</span>
        <button 
          v-for="option in sortOptions"
          :key="option.value"
          @click="changeSortOption(option.value)"
          :class="[
            'px-3 py-1 rounded-full',
            sortBy === option.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ option.label }}
        </button>
      </div>
      
      <!-- 评论输入框 -->
      <CommentEditor
        :user-avatar="currentUserAvatar"
        @submit="submitComment"
      />
  
      <!-- 评论列表 -->
      <CommentList
        :page-id="pageId"
        :current-user-avatar="currentUserAvatar"
        :sort-by="sortBy"
        @update-total-comments="updateTotalComments"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import CommentEditor from './CommentEditor.vue'
  import CommentList from './CommentList.vue'
  
  const props = defineProps({
    pageId: {
      type: String,
      required: true
    }
  })
  
  const totalComments = ref(0)
  const sortBy = ref('hot')
  
  const sortOptions = [
    { label: 'Hottest', value: 'hot' },
    { label: 'Newest', value: 'newest' },
    { label: 'Comment Time', value: 'time' }
  ]
  
  // 假设这是当前用户的头像URL
  const currentUserAvatar = ref('/placeholder.svg?height=40&width=40')
  
  const changeSortOption = (option) => {
    sortBy.value = option
  }
  
  const submitComment = async (commentData) => {
    // 这里应该是一个真实的API调用来提交评论
    // await fetch('/api/comments', {
    //   method: 'POST',
    //   body: JSON.stringify({ ...commentData, pageId: props.pageId }),
    //   headers: { 'Content-Type': 'application/json' },
    // })
  
    // 模拟添加新评论
    totalComments.value++
    // 在实际应用中，你可能需要通知 CommentList 组件刷新评论列表
  }
  
  const updateTotalComments = (total) => {
    totalComments.value = total
  }
  </script>