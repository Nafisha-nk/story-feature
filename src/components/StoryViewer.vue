<template>
    <div 
        class="story-viewer"
        @touchstart="handleSwipeStart"
        @touchend="handleSwipeEnd"
    >
        <button class="close-btn" @click="$emit('close')">×</button>
        
        <!-- Progress Bars -->
        <div class="progress-bars">
        <div 
            v-for="(story, index) in stories" 
            :key="story.id"
            class="progress-bar"
        >
            <div 
            class="progress-fill" 
            :style="{ width: getProgress(index) + '%' }"
            ></div>
        </div>
        </div>
        
        <!-- Story Content -->
        <div class="story-content">
        <img 
            class="story-image" 
            :src="currentStory.imageData" 
            alt="Story"
            :style="imageStyle"
            @load="handleImageLoad"
        >
        
        <!-- Navigation Areas -->
        <div class="story-nav">
            <button class="nav-btn" @click="showPreviousStory"></button>
            <button class="nav-btn" @click="showNextStory"></button>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
    stories: {
        type: Array,
        required: true
    },
    initialIndex: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['close'])

const currentIndex = ref(props.initialIndex)
const progressInterval = ref(null)
const progress = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)
// const imageDimensions = ref({ width: 0, height: 0 })

const currentStory = computed(() => props.stories[currentIndex.value])

const imageStyle = computed(() => {
  // Handle any image size gracefully
    const maxWidth = window.innerWidth * 0.9
    const maxHeight = window.innerHeight * 0.8
    
    return {
        maxWidth: `${maxWidth}px`,
        maxHeight: `${maxHeight}px`,
        width: 'auto',
        height: 'auto'
    }
})

const getProgress = (index) => {
    if (index < currentIndex.value) return 100
    if (index > currentIndex.value) return 0
    return progress.value
}

const startProgress = () => {
    clearInterval(progressInterval.value)
    progress.value = 0
    
    progressInterval.value = setInterval(() => {
        if (progress.value >= 100) {
        showNextStory()
        return
        }
        
        progress.value += 100 / (3000 / 50) // 3 seconds total
    }, 50)
}

const showNextStory = () => {
    if (currentIndex.value < props.stories.length - 1) {
        currentIndex.value++
        progress.value = 0
        startProgress()
    } else {
        emit('close')
    }
}

const showPreviousStory = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--
        progress.value = 0
        startProgress()
    }
}

// Handle image load to get dimensions
const handleImageLoad = (event) => {
    const img = event.target
    imageDimensions.value = {
        width: img.naturalWidth,
        height: img.naturalHeight
    }
}


// Handle swipe gestures
const handleSwipeStart = (event) => {
    touchStartX.value = event.changedTouches[0].screenX
}

const handleSwipeEnd = (event) => {
    touchEndX.value = event.changedTouches[0].screenX
    handleSwipe()
}

const handleSwipe = () => {
    const swipeThreshold = 50
    const diff = touchStartX.value - touchEndX.value
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
        showNextStory()
        } else {
        showPreviousStory()
        }
    }
}

// Keyboard navigation
const handleKeydown = (event) => {
    switch (event.key) {
        case 'ArrowLeft':
        showPreviousStory()
        break
        case 'ArrowRight':
        showNextStory()
        break
        case 'Escape':
        emit('close')
        break
    }
}

onMounted(() => {
    startProgress()
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    clearInterval(progressInterval.value)
    window.removeEventListener('keydown', handleKeydown)
})

// Restart progress when story changes
watch(currentIndex, startProgress)
</script>
