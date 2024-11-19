<template>
  <div>
    <div v-if="comments.length > 0">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :current-user-avatar="currentUserAvatar"
        @like="likeComment"
        @reply="replyToComment"
        @load-replies="loadReplies"
      />
    </div>
    <div v-else class="text-center text-gray-500">
      No comments yet, be the first to comment!
    </div>

    <!-- 评论分页 -->
    <div v-if="totalComments > 0" class="mt-6 flex justify-between items-center">
      <div class="text-sm text-gray-500">
        第 {{ currentPage }} 页，共 {{ totalPages }} 页
      </div>
      <div class="space-x-2">
        <button 
          @click="changePage(-1)" 
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          Last Page
        </button>
        <button 
          @click="changePage(1)" 
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          Next Page
        </button>
      </div>
    </div>

    <!-- 加载指示器 -->
    <div v-if="loading" class="mt-6 text-center">
      <svg class="animate-spin h-5 w-5 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import CommentItem from './CommentItem.vue'

const props = defineProps({
  pageId: {
    type: String,
    required: true
  },
  currentUserAvatar: {
    type: String,
    required: true
  },
  sortBy: {
    type: String,
    default: 'hot'
  }
})

const emit = defineEmits(['update-total-comments'])

const comments = ref([])
const currentPage = ref(1)
const totalComments = ref(0)
const perPage = 10
const loading = ref(false)

const totalPages = computed(() => Math.ceil(totalComments.value / perPage))

const fetchComments = async (page, sort) => {
  loading.value = true
  try {
    // 这里应该是一个真实的API调用
    // const response = await fetch(`/api/comments?page=${page}&perPage=${perPage}&pageId=${props.pageId}&sort=${sort}`)
    // const data = await response.json()
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟数据
    const data = {
      comments: Array(perPage).fill().map((_, index) => ({
        id: `${props.pageId}-${(page - 1) * perPage + index + 1}`,
        username: `用户${(page - 1) * perPage + index + 1}`,
        avatar: `/placeholder.svg?height=40&width=40`,
        content: `这是第${(page - 1) * perPage + index + 1}条评论 (页面ID: ${props.pageId}) 😊\n\n# 一级标题\n\n这是正文，支持 **Markdown** 语法。\n\n![示例图片](/placeholder.svg?height=200&width=300)`,
        likes: Math.floor(Math.random() * 100),
        liked: false,
        createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        replyCount: Math.floor(Math.random() * 20) + 5,
        replies: Array(5).fill().map((_, replyIndex) => ({
          id: `${props.pageId}-${(page - 1) * perPage + index + 1}-${replyIndex + 1}`,
          username: `回复用户${replyIndex + 1}`,
          avatar: `/placeholder.svg?height=24&width=24`,
          content: `这是对第${(page - 1) * perPage + index + 1}条评论的回复 (页面ID: ${props.pageId}) 👍\n\n支持 *斜体* 和 **粗体**。`,
          createdAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
        })),
      })),
      total: 100
    }

    comments.value = data.comments
    totalComments.value = data.total
    emit('update-total-comments', data.total)
  } catch (error) {
    console.error('Error fetching comments:', error)
  } finally {
    loading.value = false
  }
}

const changePage = (direction) => {
  const newPage = currentPage.value + direction
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage
    fetchComments(currentPage.value, props.sortBy)
  }
}

const likeComment = async (commentId) => {
  // 这里应该是一个真实的API调用来更新点赞状态
  // await fetch(`/api/comments/${commentId}/like`, {
  //   method: 'POST',
  //   body: JSON.stringify({ pageId: props.pageId }),
  //   headers: { 'Content-Type': 'application/json' },
  // })

  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    comment.liked = !comment.liked
    comment.likes += comment.liked ? 1 : -1
  }
}

const replyToComment = async (replyData) => {
  // 这里应该是一个真实的API调用来提交回复
  // await fetch(`/api/comments/${replyData.commentId}/replies`, {
  //   method: 'POST',
  //   body: JSON.stringify({ content: replyData.content, pageId: props.pageId }),
  //   headers: { 'Content-Type': 'application/json' },
  // })

  const comment = comments.value.find(c => c.id === replyData.commentId)
  if (comment) {
    comment.replies.unshift({
      id: `${props.pageId}-${comment.id}-${comment.replies.length + 1}`,
      username: '当前用户',
      avatar: props.currentUserAvatar,
      content: replyData.content,
      createdAt: new Date().toISOString(),
    })
    comment.replyCount++
  }
}

const loadReplies = async ({ commentId, page, perPage }) => {
  // 这里应该是一个真实的API调用来获取更多回复
  // const response = await fetch(`/api/comments/${commentId}/replies?page=${page}&perPage=${perPage}`)
  // const data = await response.json()

  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    // 模拟加载回复
    comment.replies = Array(perPage).fill().map((_, index) => ({
      id: `${props.pageId}-${commentId}-${(page - 1) * perPage + index + 1}`,
      username: `Reply User ${(page - 1) * perPage + index + 1}`,
      avatar: `/placeholder.svg?height=24&width=24`,
      content: `This is reply ${index + 1} on page ${page}`,
      createdAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    }))
  }
}

watch(() => props.sortBy, (newSort) => {
  currentPage.value = 1
  fetchComments(currentPage.value, newSort)
})

onMounted(() => {
  fetchComments(currentPage.value, props.sortBy)
})
</script>