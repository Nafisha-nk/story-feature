<template>
  <div class="app">
    <div class="header">
      <div class="logo">Stories</div>
      <div class="storage-info" v-if="storageUsage">
        Storage: {{ (storageUsage / 1024 / 1024).toFixed(2) }}MB
      </div>
    </div>
    
    <StoriesContainer
      :stories="stories"
      @open-upload="showUploadModal = true"
      @open-story="openStoryViewer"
    />
    
    <div v-if="!hasStories" class="no-stories">
      No stories yet. Click the + button to add your first story!
    </div>

    <!-- Clear Storage Button -->
    <div class="clear-storage" v-if="hasStories">
      <button @click="clearAllStories" class="clear-btn">
        Clear All Stories
      </button>
    </div>
    
    <!-- Story Viewer -->
    <StoryViewer
      v-if="showStoryViewer"
      :stories="stories"
      :initial-index="currentStoryIndex"
      @close="showStoryViewer = false"
    />
    
    <!-- Upload Modal -->
    <UploadModal
      v-if="showUploadModal"
      @close="showUploadModal = false"
      @upload="handleStoryUpload"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StoriesContainer from './components/StoriesContainer.vue'
import StoryViewer from './components/StoryViewer.vue'
import UploadModal from './components/UploadModal.vue'
import { useStories } from './composables/useStories.js'

const {
  stories,
  hasStories,
  storageUsage,
  loadStories,
  addStory,
  // validateImageDimensions,
  fileToBase64,
  clearStorage
} = useStories()

const showUploadModal = ref(false)
const showStoryViewer = ref(false)
const currentStoryIndex = ref(0)

const openStoryViewer = (index) => {
  currentStoryIndex.value = index
  showStoryViewer.value = true
}

const handleStoryUpload = async (file) => {
  try {
    // await validateImageDimensions(file)
    const imageData = await fileToBase64(file)
    addStory(imageData)
  } catch (error) {
    alert(error.message)
  }
}

const clearAllStories = () => {
  if (confirm('Are you sure you want to clear all stories?')) {
    clearStorage()
  }
}

onMounted(() => {
  loadStories()
})
</script>
